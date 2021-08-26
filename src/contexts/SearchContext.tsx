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
  id: number;
  title: {
    english: string;
    romanji: string;
  };
  trailer: {
    id: number;
    site: string;
    thumbnail: string;
  };
  averageScore: number;
  coverImage: {
    large: string;
  };
  description: string;
  genres: Array<string>;
}

interface SearchContextData {
  searchedAnime: Animes[];
  pageInfo: PageInfo;
  isSearchLoading: boolean;
  getAnimeOnSearch: (animeTitle: string) => Promise<void>;
  handleLoadMoreSearchedAnimeData: () => void;
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
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setSearchedAnime(data.data.Page.media);
    setPageInfo(data.data.Page.pageInfo);
    setIsSearchLoading(false);
    console.log(data.data);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsSearchLoading(false);
  }

  const getAnimeOnSearch = async (animeInput: string) => {
    setIsSearchLoading(true);
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
                trailer {
                  id
                  site
                  thumbnail
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

  function handleLoadMoreSearchedAnimeData() {
    const newLimit = perPage + 5;
    setPerPage(newLimit);
  }

  return (
    <SearchContext.Provider
      value={{
        getAnimeOnSearch,
        searchedAnime,
        pageInfo,
        handleLoadMoreSearchedAnimeData,
        isSearchLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
