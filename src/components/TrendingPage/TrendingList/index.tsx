import ReactPlayer from 'react-player';
import { BsFillPlayFill, BsStarFill } from 'react-icons/bs';
import { TrendingListContainer } from './styles';
import React, { useContext } from 'react';
import { TrendingContext } from '../../../contexts/TrendingContext';

export function TrendingList() {
  const { trendingAnimes, isTrendingLoading } = useContext(TrendingContext);

  if (isTrendingLoading) {
    return <h1>Loading....</h1>;
  }
  console.log(trendingAnimes);
  return (
    <TrendingListContainer>
      <ul>
        {trendingAnimes.map((anime) => {
          const {
            averageScore,
            type,
            startDate,
            coverImage,
            id,
            title,
            trailer,
          } = anime;
          return (
            <li key={id}>
              {trailer ? (
                <ReactPlayer
                  controls={true}
                  // onMouseEnter={() => handleOnMouseHover(id)}
                  // onMouseLeave={handleOnMouseLeave}
                  // light={animePlaying !== id && `${coverImage.extraLarge}`}
                  light={coverImage.extraLarge}
                  playIcon={<BsFillPlayFill />}
                  // playing={animePlaying === id ? true : false}
                  // muted={animePlaying === id ? true : false}
                  url={`https://www.youtube.com/watch?v=${trailer?.id}`}
                />
              ) : (
                <img
                  src={coverImage.extraLarge}
                  alt={title.english || title.romanji}
                />
              )}

              <div>
                <h4>{title.english ? title.english : title.romanji}</h4>

                <article>
                  <span>
                    <BsStarFill /> {averageScore / 10}
                  </span>
                  <span>Season 1</span>
                  <span>{startDate.year}</span>
                </article>
              </div>

              <small>{type.toLocaleLowerCase()}</small>
            </li>
          );
        })}
      </ul>
    </TrendingListContainer>
  );
}
