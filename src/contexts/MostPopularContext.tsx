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

interface MostPopularContextData {
  pageInfo: PageInfo;
  isMostPopularLoading: boolean;
  mostPouplarAnimes: Animes[];
  handleLoadMoreMostPopularData: () => void;
}

interface MostPopularProviderProps {
  children: ReactNode;
}

export const MostPopularContext = createContext<MostPopularContextData>(
  {} as MostPopularContextData,
);

export function MostPopularProvider({ children }: MostPopularProviderProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [pageInfo, setPageInfo] = useState();
  const [isMostPopularLoading, setIsMostPopularLoading] = useState(false);
  const [mostPouplarAnimes, setMostPopularAnimes] = useState<Animes[]>([]);

  useEffect(() => {
    console.log('calling function');
    getMostPopularAnimes();
  }, []);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setMostPopularAnimes(data.data.Page.media);
    setPageInfo(data.data.Page.pageInfo);
    setIsMostPopularLoading(false);
    console.log('most popular:', data.data);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsMostPopularLoading(false);
  }

  const getMostPopularAnimes = () => {
    setIsMostPopularLoading(true);
    try {
      let query = `
        query ($page: Int, $perPage: Int) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (type: ANIME, sort: TRENDING_DESC) {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMostPopularAnimes();
  }, [perPage]);

  function handleLoadMoreMostPopularData() {
    const newLimit = perPage + 5;
    setPerPage(newLimit);
  }

  return (
    <MostPopularContext.Provider
      value={{
        pageInfo,
        isMostPopularLoading,
        mostPouplarAnimes,
        handleLoadMoreMostPopularData,
      }}
    >
      {children}
    </MostPopularContext.Provider>
  );
}
