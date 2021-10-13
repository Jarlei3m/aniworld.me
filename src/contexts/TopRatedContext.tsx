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
  slug: string;
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

interface MangasProps {
  id: number;
  slug: string;
  type: string;
  title: {
    english: string;
    romanji: string;
    native: string;
  };
  externalLinks?: {
    id: number;
    url: string;
    site: string;
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

interface TopRatedContextData {
  pageInfo: PageInfoProps;
  isTopRatedLoading: boolean;
  topRatedAnimes: AnimesProps[];
  topRatedMangas: MangasProps[];
  topRatedAnimesAndMangas: AnimesProps[];

  // handleLoadMoreTrendingData: () => void;
}

interface TopRatedProvider {
  children: ReactNode;
}

export const TopRatedContext = createContext<TopRatedContextData>(
  {} as TopRatedContextData,
);

export function TopRatedProvider({ children }: TopRatedProvider) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(false);
  const [topRatedAnimes, setTopRatedAnimes] = useState<AnimesProps[]>([]);
  const [topRatedMangas, setTopRatedMangas] = useState<MangasProps[]>([]);
  const [topRatedAnimesAndMangas, setTopRatedAnimesAndMangas] = useState<
    AnimesProps[]
  >([]);

  useEffect(() => {
    fetchTopRatedAnimes();
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

  function handleData({ data }) {
    // formatting data

    const animeData = data.AnimePage.media.map((anime) => {
      return {
        ...anime,
        slug: anime.title?.english
          ? anime.title?.english
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : anime.title?.romanji
          ? anime.title?.romanji
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : null,
      };
    });

    const allMediasData = data.AllMediasPage.media.map((allMedias) => {
      return {
        ...allMedias,
        slug: allMedias.title?.english
          ? allMedias.title?.english
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : allMedias.title?.romanji
          ? allMedias.title?.romanji
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : null,
      };
    });

    const mangaData = data.MangaPage.media.map((manga) => {
      return {
        ...manga,
        slug: manga.title?.english
          ? manga.title?.english
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : manga.title?.romanji
          ? manga.title?.romanji
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          : null,
      };
    });

    setTopRatedAnimes(animeData);
    setTopRatedMangas(mangaData);
    setTopRatedAnimesAndMangas(allMediasData);
    // setPageInfo(data.Page.pageInfo);
    setIsTopRatedLoading(false);
  }

  function handleError(data) {
    console.error('Error:', data);
    setIsTopRatedLoading(false);
  }

  const fetchTopRatedAnimes = () => {
    setIsTopRatedLoading(true);
    try {
      let query = `
        query ($page: Int, $perPage: Int) {
          AnimePage: Page (page: 1, perPage: 20) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (type: ANIME, sort: SCORE_DESC, isAdult: false) {
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
          MangaPage: Page (page: 1, perPage: 20) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (type: MANGA, sort: SCORE_DESC, isAdult: false) {
              id
              type
              title {
                english
                romaji
                native
              }
              externalLinks {
                id
                url
                site
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
           AllMediasPage: Page (page: $page, perPage: $perPage) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media (sort: SCORE_DESC, isAdult: false) {
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
    <TopRatedContext.Provider
      value={{
        topRatedAnimes,
        topRatedMangas,
        topRatedAnimesAndMangas,
        // handleLoadMoreTrendingData,
        isTopRatedLoading,
        pageInfo,
      }}
    >
      {children}
    </TopRatedContext.Provider>
  );
}
