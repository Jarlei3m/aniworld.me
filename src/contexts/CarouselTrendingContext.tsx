import { createContext, ReactNode, useEffect, useState } from 'react';

interface AnimesProps {
  id: number;
  title: {
    english: string;
    romanji: string;
    native: string;
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

interface MangasProps {
  id: number;
  title: {
    english: string;
    romanji: string;
    native: string;
  };
  averageScore: number;
  coverImage: {
    extraLarge: string;
  };
  description: string;
  genres: Array<string>;
  type: string;
}

interface CarouselTrendingContextData {
  isCarouselTrendingLoading: boolean;
  carouselTrendingAnimes: AnimesProps[];
  carouselTrendingMangas: MangasProps[];
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
  const [perPage, setPerPage] = useState(16);
  const [isCarouselTrendingLoading, setIsCarouselTrendingLoading] =
    useState(false);
  const [carouselTrendingAnimes, setCarouselTrendingAnimes] = useState<
    AnimesProps[]
  >([]);
  const [carouselTrendingMangas, setCarouselTrendingMangas] = useState<
    MangasProps[]
  >([]);

  useEffect(() => {
    fetchCarouselTrending();
  }, []);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log('animes:', data.data.AnimePage.animes);
    console.log('mangas:', data.data.MangaPage.mangas);

    setCarouselTrendingAnimes(data.data.AnimePage.animes);
    setCarouselTrendingMangas(data.data.MangaPage.mangas);
    setIsCarouselTrendingLoading(false);
  }

  function handleError(data) {
    console.error(Error);
    setIsCarouselTrendingLoading(false);
  }

  const fetchCarouselTrending = () => {
    setIsCarouselTrendingLoading(true);
    try {
      let query = `
        query ($page: Int, $perPage: Int) {
          AnimePage: Page(page: $page, perPage: $perPage) {
            animes: media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
              id
              type
              title {
                english
                romaji
                native
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
          MangaPage: Page(page: $page, perPage: $perPage) {
            mangas: media(type: MANGA, sort: TRENDING_DESC, isAdult: false) {
              id
              type
              title {
                english
                romaji
                native
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

  return (
    <CarouselTrendingContext.Provider
      value={{
        isCarouselTrendingLoading,
        carouselTrendingAnimes,
        carouselTrendingMangas,
      }}
    >
      {children}
    </CarouselTrendingContext.Provider>
  );
}
