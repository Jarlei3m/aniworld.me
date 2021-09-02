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
    extraLarge: string;
  };
  description: string;
  genres: Array<string>;
}

interface TrendingContextData {
  pageInfo: PageInfo;
  isTrendingLoading: boolean;
  trendingAnimes: Animes[];
  // handleLoadMoreTrendingData: () => void;
}

interface TrendingProviderProps {
  children: ReactNode;
}

export const TrendingContext = createContext<TrendingContextData>(
  {} as TrendingContextData,
);

export function TrendingProvider({ children }: TrendingProviderProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [pageInfo, setPageInfo] = useState();
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingAnimes, setTrendingAnimes] = useState<Animes[]>([]);

  useEffect(() => {
    fetchTrendingAnimes();
  }, []);

  // useEffect(() => {
  //   const event = window.addEventListener('scroll', () => {
  //     if (
  //       !isTrendingLoading &&
  //       window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
  //     ) {
  //       handleLoadMoreTrendingData();
  //     }
  //   });
  //   return () => window.removeEventListener('scroll', event);
  // }, []);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    const filteredTrendingAnimes = data.data.Page.media.filter(
      (anime) => anime.trailer !== null,
    );

    if (filteredTrendingAnimes.length < 5) {
      const acc = 5 - filteredTrendingAnimes.length;
      setPerPage(perPage + acc);
    }

    setTrendingAnimes(filteredTrendingAnimes);
    setPageInfo(data.data.Page.pageInfo);
    setIsTrendingLoading(false);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsTrendingLoading(false);
  }

  const fetchTrendingAnimes = () => {
    setIsTrendingLoading(true);
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
            media (type: ANIME, sort: TRENDING_DESC, isAdult: false) {
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
                extraLarge
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
    fetchTrendingAnimes();
  }, [perPage]);

  // function handleLoadMoreTrendingData() {
  //   setPerPage((oldPerPage) => {
  //     return oldPerPage + 5;
  //   });
  // }

  return (
    <TrendingContext.Provider
      value={{
        pageInfo,
        isTrendingLoading,
        trendingAnimes,
        // handleLoadMoreTrendingData,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
}
