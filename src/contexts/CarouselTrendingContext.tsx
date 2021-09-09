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

interface CarouselTrendingContextData {
  pageInfo: PageInfo;
  isCarouselTrendingLoading: boolean;
  carouselTrendingAnimes: Animes[];
  handleLoadMoreTrendingData: (fetchCounter: number) => void;
}

interface CarouselTrendingProviderProps {
  children: ReactNode;
}

export const CarouselTrendingContext =
  createContext<CarouselTrendingContextData>({} as CarouselTrendingContextData);

export function CarouselTrendingProvider({
  children,
}: CarouselTrendingProviderProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [pageInfo, setPageInfo] = useState();
  const [isCarouselTrendingLoading, setIsCarouselTrendingLoading] =
    useState(false);
  const [carouselTrendingAnimes, setCarouselTrendingAnimes] = useState<
    Animes[]
  >([]);

  useEffect(() => {
    fetchCarouselTrendingAnimes();
  }, []);

  useEffect(() => {
    fetchCarouselTrendingAnimes();
  }, [perPage]);

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

    setCarouselTrendingAnimes(filteredTrendingAnimes);
    setPageInfo(data.data.Page.pageInfo);
    setIsCarouselTrendingLoading(false);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsCarouselTrendingLoading(false);
  }

  const fetchCarouselTrendingAnimes = () => {
    setIsCarouselTrendingLoading(true);
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
    fetchCarouselTrendingAnimes();
  }, [perPage]);

  function handleLoadMoreTrendingData(fetchCounter: number) {
    setPerPage((oldPerPage) => {
      return oldPerPage * fetchCounter;
    });
  }

  return (
    <CarouselTrendingContext.Provider
      value={{
        pageInfo,
        isCarouselTrendingLoading,
        carouselTrendingAnimes,
        handleLoadMoreTrendingData,
      }}
    >
      {children}
    </CarouselTrendingContext.Provider>
  );
}
