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
  };
  averageScore: number;
  coverImage: {
    large: string;
  };
  genres: Array<string>;
}

interface SearchContextData {
  searchedAnime: AnimesProps[];
  pageInfo: PageInfoProps;
  isSearchLoading: boolean;
  fetchAnimeOnSearch: (animeTitle: string) => Promise<void>;
  handleLoadMoreSearchedAnimeData: () => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData,
);

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchedAnime, setSearchedAnime] = useState<AnimesProps[]>([]);
  const [animeTitle, setAnimeTitle] = useState('');
  const [pageInfo, setPageInfo] = useState<PageInfoProps>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isSearchLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
      ) {
        handleLoadMoreSearchedAnimeData();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSearchLoading, handleLoadMoreSearchedAnimeData]);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData({ data }) {
    //formatting data
    const searchedAnimeData = data.Page.media.map((anime) => {
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

    setSearchedAnime(searchedAnimeData);
    setPageInfo(data.Page.pageInfo);
    setIsSearchLoading(false);
  }

  function handleError(data) {
    // alert('Error, check console');
    console.error(Error);
    setIsSearchLoading(false);
  }

  const fetchAnimeOnSearch = async (animeInput: string) => {
    setIsSearchLoading(true);
    try {
      if (animeInput.length > 0) {
        setAnimeTitle(animeInput);
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
              media (type: ANIME, search: $search, isAdult: false) {
                id
                title {
                  english
                  romaji
                }
                averageScore
                genres
                coverImage {
                  large
                }
              }
            }
          }
        `;

        let variables = {
          search: animeInput,
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
        setAnimeTitle('');
        setPerPage(5);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnimeOnSearch(animeTitle);
  }, [perPage]);

  function handleLoadMoreSearchedAnimeData() {
    setPerPage((oldPerPage) => {
      return oldPerPage + 5;
    });
  }

  return (
    <SearchContext.Provider
      value={{
        fetchAnimeOnSearch,
        searchedAnime,
        pageInfo,
        handleLoadMoreSearchedAnimeData,
        isSearchLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
