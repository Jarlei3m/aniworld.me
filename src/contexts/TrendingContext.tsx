import { createContext, ReactNode, useEffect, useState } from 'react';

interface PageInfoProps {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

interface AnimesProps {
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
  startDate: {
    year: number;
  };
  type: string;
}

interface TrendingContextData {
  pageInfo: PageInfoProps;
  isTrendingLoading: boolean;
  trendingAnimes: AnimesProps[];
  // handleLoadMoreTrendingData: () => void;
}

interface TrendingProvider {
  children: ReactNode;
}

export const TrendingContext = createContext<TrendingContextData>(
  {} as TrendingContextData,
);

export function TrendingProvider({ children }: TrendingProvider) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingAnimes, setTrendingAnimes] = useState<AnimesProps[]>([]);

  useEffect(() => {
    fetchTrendingAnimes();
  }, []);

  //  useEffect(() => {
  //    const event = window.addEventListener('scroll', () => {
  //      if (
  //        !isTrendingLoading &&
  //        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
  //      ) {
  //        handleLoadMoreTrendingData();
  //      }
  //    });
  //    return () => window.removeEventListener('scroll', event);
  //  }, []);

  // function handleLoadMoreTrendingData() {
  //   setPerPage((oldPerPage) => {
  //     return oldPerPage + 5;
  //   });
  // }

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log('start fetching');
    // const filteredTrendingAnimes = data.data.Page.media.filter(
    //   (anime) => anime.trailer !== null,
    // );

    console.log('fetch: result:', data.data.Page.media);

    // if (filteredTrendingAnimes.length < 20) {
    //   const acc = 20 - filteredTrendingAnimes.length;
    //   setPerPage(perPage + acc);
    //   fetchTrendingAnimes();
    // }

    setTrendingAnimes(data.data.Page.media);
    setPageInfo(data.data.Page.pageInfo);
    setIsTrendingLoading(false);
  }

  function handleError(data) {
    console.error(Error);
    setIsTrendingLoading(false);
  }

  const fetchTrendingAnimes = () => {
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
            media (sort: TRENDING_DESC, isAdult: false) {
              id
              type
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
              startDate {
                year
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TrendingContext.Provider
      value={{
        trendingAnimes,
        // handleLoadMoreTrendingData,
        isTrendingLoading,
        pageInfo,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
}
