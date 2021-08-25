import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';

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
  getAnimeOnSearch: (animeTitle: string) => Promise<void>;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData,
);

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchedAnime, setSearchedAnime] = useState<Animes[]>([]);
  const [pageInfo, setPageInfo] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log('dados recebidos:', data.data.Page);
    // const { averageScore, coverImage, description, genres, id, title } = data.data.Media

    // const { averageScore, coverImage, description, genres, id, title } =
    //   data.data.Media;

    // const formattedData {
    //   score: averageScore,
    //   coverImage,
    //   description,
    //   allGenres: genres.toString(),
    //   id,
    //   title
    // }

    setSearchedAnime(data.data.Page.media);
    setPageInfo(data.data.Page.pageInfo);
    // console.log('dado recebido:', data.data.Media);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
  }

  const getAnimeOnSearch = async (animeTitle: string) => {
    try {
      if (animeTitle.length > 1) {
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
          search: animeTitle,
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log('SA on context:', searchedAnime);

  return (
    <SearchContext.Provider
      value={{ getAnimeOnSearch, searchedAnime, pageInfo }}
    >
      {children}
    </SearchContext.Provider>
  );
}
