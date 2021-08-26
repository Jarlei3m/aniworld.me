import { Container } from './styles';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { MostPopularContext } from '../../contexts/MostPopularContext';

export function MostPopular() {
  const [limit, setLimit] = useState(5);

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
              const {
                id,
                title,
                description,
                averageScore,
                genres,
                coverImage,
              } = anime;
              return (
                <li key={id}>
                  <img src={coverImage.large} alt={title.english} />
                  <article>
                    <div>
                      <h4>{title.english}</h4>
                      <p>{genres.toString().replaceAll(',', ', ') + '.'}</p>
                    </div>
                    <span>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                    </span>
                  </article>
                </li>
              );
            })}
          </ul>
          {pageInfo?.hasNextPage && (
            <button
              type="button"
              onClick={() => handleLoadMoreSearchedAnimeData()}
            >
              {isSearchLoading ? 'Loading...' : 'See More'}
            </button>
          )}
        </>
      ) : (
        <>
          <h1>Popular This Week</h1>

          <ul>
            {mostPouplarAnimes.map((anime) => {
              const {
                id,
                title,
                description,
                averageScore,
                genres,
                coverImage,
              } = anime;
              return (
                <li key={id}>
                  <img src={coverImage.large} alt={title.english} />
                  <article>
                    <div>
                      <h4>{title.english}</h4>
                      <p>{genres.toString().replaceAll(',', ', ') + '.'}</p>
                    </div>
                    <span>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                    </span>
                  </article>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={() => handleLoadMoreMostPopularData()}>
            {isMostPopularLoading ? 'Loading...' : 'See More'}
          </button>
        </>
      )}
    </Container>
  );
}
