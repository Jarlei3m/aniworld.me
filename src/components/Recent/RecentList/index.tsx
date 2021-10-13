import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { BsFillPlayFill, BsStarFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { RecentContext } from '../../../contexts/RecentContext';
import { Info, List, ListItem, RecentListContainer } from './styles';

export function RecentList() {
  const [isPlaying, setIsPlaying] = useState(0);
  const { recentAnimesAndMangas, isRecentLoading } = useContext(RecentContext);

  if (isRecentLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <RecentListContainer>
      <List>
        {recentAnimesAndMangas.map((anime) => {
          const {
            averageScore,
            type,
            startDate,
            seasonYear,
            duration,
            coverImage,
            id,
            title,
            slug,
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
                <Link
                  href={
                    type === 'anime'
                      ? `/${type.toLowerCase()}-list/${slug}`
                      : `/${type.toLowerCase()}-list/${slug}`
                  }
                >
                  <a>{english || romanji || native}</a>
                </Link>

                <article>
                  <span>
                    <BsStarFill /> {(averageScore / 10).toFixed(1)}
                  </span>
                  <span>Season 1</span>
                  <time>{seasonYear}</time>
                </article>
              </Info>

              <small>{type.toLocaleLowerCase()}</small>
            </ListItem>
          );
        })}
      </List>

      <button>See more</button>
    </RecentListContainer>
  );
}
