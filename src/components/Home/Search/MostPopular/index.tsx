import { useContext } from 'react';
import { MostPopularContext } from '../../../../contexts/MostPopularContext';
import { SearchContext } from '../../../../contexts/SearchContext';
import { Loading } from '../../../Loading';
import { Stars } from '../../../Stars';
import { Container } from './styles';
import Link from 'next/link';

export function MostPopular() {
  // SEARCH CONTEXT
  const {
    searchedAnime,
    pageInfo,
    handleLoadMoreSearchedAnimeData,
    isSearchLoading,
  } = useContext(SearchContext);

  // POPULAR CONTEXT
  const {
    mostPouplarAnimes,
    handleLoadMoreMostPopularData,
    isMostPopularLoading,
  } = useContext(MostPopularContext);

  return (
    <Container>
      {searchedAnime.length !== 0 ? (
        <>
          <h1>{`Search Results:`}</h1>

          <ul>
            {searchedAnime.map((anime) => {
              const { id, title, averageScore, slug, genres, coverImage } =
                anime;
              return (
                <li key={id}>
                  <img src={coverImage.large} alt={title.english} />
                  <article>
                    <div>
                      <Link href={`/anime-list/${slug}`}>
                        <a>{title.english ? title.english : title.romanji}</a>
                      </Link>
                      <p>{genres.toString().replaceAll(',', ', ') + '.'}</p>
                    </div>
                    <Stars averageScore={averageScore} />
                  </article>
                </li>
              );
            })}
          </ul>
          {pageInfo?.hasNextPage && <Loading />}
        </>
      ) : (
        <>
          <h1>Popular This Week</h1>

          <ul>
            {mostPouplarAnimes.map((anime) => {
              const { id, title, slug, averageScore, genres, coverImage } =
                anime;
              return (
                <li key={id}>
                  <img src={coverImage.large} alt={title.english} />
                  <article>
                    <div>
                      <Link href={`/anime-list/${slug}`}>
                        <a>{title.english ? title.english : title.romanji}</a>
                      </Link>
                      <p>{genres.toString().replaceAll(',', ', ') + '.'}</p>
                    </div>
                    <Stars averageScore={averageScore} />
                  </article>
                </li>
              );
            })}
          </ul>
          {isMostPopularLoading && <Loading />}
        </>
      )}
    </Container>
  );
}
