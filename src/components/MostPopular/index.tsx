import { Container } from './styles';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { SearchContext } from '../../contexts/SearchContext';

export function MostPopular() {
  const [popularThisWeek, setPopularThisWeek] = useState([]);
  const [limit, setLimit] = useState(5);

  const { searchedAnime, pageInfo, handleLoadMoreData, isLoading } =
    useContext(SearchContext);
  console.log('teste:', searchedAnime);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&limit=${limit}`,
        )
        .then((data) => setPopularThisWeek(data.data.results));
    } catch (err) {
      console.log(err);
    }
  }, [limit]);

  function loadMoreData() {
    const newLimit = limit + 5;
    setLimit(newLimit);
  }

  console.log(searchedAnime.length);

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
            <button type="button" onClick={() => handleLoadMoreData()}>
              {isLoading ? 'Loading...' : 'See More'}
            </button>
          )}
        </>
      ) : (
        <>
          <h1>Popular This Week</h1>

          <ul>
            {popularThisWeek.map((item) => {
              const { image_url, mal_id, score, title } = item;
              return (
                <li key={mal_id}>
                  <img src={image_url} alt={title} />
                  <article>
                    <div>
                      <h4>{title}</h4>
                      <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
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

          <button type="button" onClick={() => loadMoreData()}>
            See More
          </button>
        </>
      )}
    </Container>
  );
}
