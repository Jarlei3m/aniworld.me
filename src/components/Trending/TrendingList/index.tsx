import ReactPlayer from 'react-player';
import { BsFillPlayFill, BsStarFill } from 'react-icons/bs';
import { Info, List, ListItem, TrendingListContainer } from './styles';
import React, { useContext, useState } from 'react';
import { TrendingContext } from '../../../contexts/TrendingContext';
import Link from 'next/link';

export function TrendingList() {
  const [isPlaying, setIsPlaying] = useState(0);
  const { trendingAnimesAndMangas, isTrendingLoading } =
    useContext(TrendingContext);

  if (isTrendingLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <TrendingListContainer>
      <List>
        {trendingAnimesAndMangas.map((anime) => {
          const {
            averageScore,
            type,
            startDate,
            coverImage,
            id,
            title,
            trailer,
          } = anime;

          const { english, romanji, native } = title;
          return (
            <ListItem isPlaying={isPlaying === id} key={id}>
              {trailer ? (
                <ReactPlayer
                  controls={true}
                  onClickPreview={() => setIsPlaying(id)}
                  light={isPlaying !== id && `${coverImage.extraLarge}`}
                  playIcon={<BsFillPlayFill />}
                  playing={isPlaying === id ? true : false}
                  url={`https://www.youtube.com/watch?v=${trailer?.id}`}
                />
              ) : (
                <img src={coverImage.extraLarge} alt={english || romanji} />
              )}

              <Info>
                <Link href="/">
                  <a>{english || romanji || native}</a>
                </Link>

                <article>
                  <span>
                    <BsStarFill /> {(averageScore / 10).toFixed(1)}
                  </span>
                  <span>Season 1</span>
                  <span>{startDate.year}</span>
                </article>
              </Info>

              <small>{type.toLocaleLowerCase()}</small>
            </ListItem>
          );
        })}
      </List>

      <button>See more</button>
    </TrendingListContainer>
  );
}
