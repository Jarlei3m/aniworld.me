import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

interface Animes {
  averageScore: number;
  coverImage: {
    large: string;
  };
  description: string;
  genres: Array<string>;
  id: number;
  title: {
    english: string;
    romanji: string;
  };
}

interface SearchContextData {
  searchedAnime: Animes[];
  pageInfo: PageInfo;
  isLoading: boolean;
  getAnimeOnSearch: (animeTitle: string) => Promise<void>;
  handleLoadMoreData: () => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData,
);

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchedAnime, setSearchedAnime] = useState<Animes[]>([]);
  const [animeTitle, setAnimeTitle] = useState('');
  const [pageInfo, setPageInfo] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setSearchedAnime(data.data.Page.media);
    setPageInfo(data.data.Page.pageInfo);
    setIsLoading(false);
    console.log(data.data);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsLoading(false);
  }

  const getAnimeOnSearch = async (animeInput: string) => {
    setIsLoading(true);
    try {
      if (animeInput.length > 0) {
        setAnimeTitle(animeInput);
        let query = `
          query ($search: String, $page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media (type: ANIME, search: $search) {
                id
                title {
                  english
                  romaji
                }
                averageScore
                description
                genres
                coverImage {
                  large
                }
              }
            }
          }
        `;

        let variables = {
          search: animeInput,
          page: page,
          perPage: perPage,
        };

        let API_URL = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: query,
              variables: variables,
            }),
          };

        // http request
        fetch(API_URL, options)
          .then(handleResponse)
          .then(handleData)
          .catch(handleError);
      } else {
        setSearchedAnime([]);
        setAnimeTitle('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnimeOnSearch(animeTitle);
  }, [perPage]);

  function handleLoadMoreData() {
    const newLimit = perPage + 5;
    setPerPage(newLimit);
  }

  return (
    <SearchContext.Provider
      value={{
        getAnimeOnSearch,
        searchedAnime,
        pageInfo,
        handleLoadMoreData,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
