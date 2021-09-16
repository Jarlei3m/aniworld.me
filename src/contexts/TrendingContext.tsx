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
  type: string;
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
  startDate: {
    year: number;
  };
}

type MangasProps = Omit<AnimesProps, 'trailer'>;

interface TrendingContextData {
  pageInfo: PageInfoProps;
  isTrendingLoading: boolean;
  trendingAnimes: AnimesProps[];
  trendingMangas: MangasProps[];
  trendingAnimesAndMangas: AnimesProps[];

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
  const [trendingMangas, setTrendingMangas] = useState<MangasProps[]>([]);
  const [trendingAnimesAndMangas, setTrendingAnimesAndMangas] = useState<
    AnimesProps[]
  >([]);

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
    // const filteredTrendingAnimes = data.data.Page.media.filter(
    //   (anime) => anime.type === 'ANIME',
    // );

    // const filteredTrendingMangas = data.data.Page.media.filter(
    //   (anime) => anime.type === 'MANGA',
    // );

    // if (filteredTrendingAnimes.length < 20) {
    //   const acc = 20 - filteredTrendingAnimes.length;
    //   setPerPage(perPage + acc);
    //   fetchTrendingAnimes();
    // }

    // if (filteredTrendingMangas.length < 20) {
    //   const acc = 20 - filteredTrendingMangas.length;
    //   setPerPage(perPage + acc);
    //   fetchTrendingAnimes();
    // }

    console.log('ANIME MEDIA:', data.data.AnimePage.media);
    console.log('MANGA MEDIA:', data.data.MangaPage.media);
    console.log('ALL MEDIA:', data.data.AllMediasPage.media);

    setTrendingAnimes(data.data.AnimePage.media);
    setTrendingMangas(data.data.MangaPage.media);
    setTrendingAnimesAndMangas(data.data.AllMediasPage.media);
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
          AnimePage: Page (page: 1, perPage: 16) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (type: ANIME, sort: TRENDING_DESC, isAdult: false) {
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
              startDate {
                year
              }
            }
          }
          MangaPage: Page (page: 1, perPage: 16) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (type: MANGA, sort: TRENDING_DESC, isAdult: false) {
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
              startDate {
                year
              }
            }
          }
           AllMediasPage: Page (page: $page, perPage: $perPage) {
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
        trendingMangas,
        trendingAnimesAndMangas,
        // handleLoadMoreTrendingData,
        isTrendingLoading,
        pageInfo,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
}
