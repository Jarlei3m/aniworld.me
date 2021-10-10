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
    large: string;
  };
  description: string;
  genres: Array<string>;
  seasonYear: string;
}

interface MostPopularContextData {
  pageInfo: PageInfoProps;
  isMostPopularLoading: boolean;
  mostPouplarAnimes: AnimesProps[];
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
  const [perPage, setPerPage] = useState(10);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  const [isMostPopularLoading, setIsMostPopularLoading] = useState(false);
  const [mostPouplarAnimes, setMostPopularAnimes] = useState<AnimesProps[]>([]);

  useEffect(() => {
    fetchMostPopularAnimes();
  }, []);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !isMostPopularLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
      ) {
        handleLoadMoreMostPopularData();
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData({ data }) {
    //formatting data
    const popularAnimeData = data.Page.media.map((anime) => {
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

    setMostPopularAnimes(popularAnimeData);
    // setPageInfo(data.Page.pageInfo);
    setIsMostPopularLoading(false);
    console.log('most popular:', page);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsMostPopularLoading(false);
  }

  const fetchMostPopularAnimes = () => {
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
            media (type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
              id
              title {
                english
                romaji
                native
              }
              averageScore
              genres
              seasonYear
              description
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
    fetchMostPopularAnimes();
  }, [perPage]);

  function handleLoadMoreMostPopularData() {
    setPerPage((oldPerPage) => {
      return oldPerPage + 5;
    });
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
