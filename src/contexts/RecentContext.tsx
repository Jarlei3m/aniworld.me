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
    month: number;
    day: number;
  };
  seasonYear: number;
  duration: number;
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
    day: number;
    month: number;
  };
  seasonYear: number;
}

interface RecentContextData {
  pageInfo: PageInfoProps;
  isRecentLoading: boolean;
  recentAnimes: AnimesProps[];
  recentMangas: MangasProps[];
  recentAnimesAndMangas: AnimesProps[];
}

interface RecentProviderProps {
  children: ReactNode;
}

export const RecentContext = createContext<RecentContextData>(
  {} as RecentContextData,
);

export function RecentProvider({ children }: RecentProviderProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  const [isRecentLoading, setIsRecentLoading] = useState(false);
  const [recentAnimes, setRecentAnimes] = useState<AnimesProps[]>([]);
  const [recentMangas, setRecentMangas] = useState<MangasProps[]>([]);
  const [recentAnimesAndMangas, setRecentAnimesAndMangas] = useState<
    AnimesProps[]
  >([]);

  useEffect(() => {
    fetchRecentAnimes();
  }, []);

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

    setRecentAnimes(animeData);
    setRecentMangas(mangaData);
    setRecentAnimesAndMangas(allMediasData);
    // setPageInfo(data.Page.pageInfo);
    setIsRecentLoading(false);
  }

  function handleError(data) {
    console.error('Error:', data);
    setIsRecentLoading(false);
  }

  const fetchRecentAnimes = () => {
    setIsRecentLoading(true);
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
            media (type: ANIME, seasonYear: 2021, sort: POPULARITY_DESC, isAdult: false) {
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
              seasonYear
              duration
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
            media (type: MANGA, seasonYear: 2021, sort: POPULARITY_DESC, isAdult: false) {
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
              seasonYear
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
            media (seasonYear: 2021, sort: POPULARITY_DESC, isAdult: false) {
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
              seasonYear
              duration
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
    <RecentContext.Provider
      value={{
        pageInfo,
        isRecentLoading,
        recentAnimes,
        recentMangas,
        recentAnimesAndMangas,
      }}
    >
      {children}
    </RecentContext.Provider>
  );
}
