import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { CarouselSlideContext } from '../../../../contexts/CarouselSlide/CarouselSlideContext';
import { TrendingContext } from '../../../../contexts/TrendingContext';
import { Carousel, CarouselContent, Container } from './styles';

export function AnimesTrending() {
  const [isPlaying, setIsPlaying] = useState(0);
  const { trendingAnimes } = useContext(TrendingContext);

  const {
    slideWidth,
    slideLimit,
    playerWidth,
    playerHeight,
    handleCarouselButton,
    slideCounter,
    translateAction,
  } = useContext(CarouselSlideContext);

  return (
    <Container>
      <h2>
        Animes on Trending
        <span title="See more trending topics animes">
          <Link href="/trending">
            <a>see more</a>
          </Link>
        </span>
      </h2>

      {slideCounter > 0 && (
        <button
          onClick={() =>
            handleCarouselButton('previous', trendingAnimes.length)
          }
          type="button"
        >
          <MdKeyboardArrowLeft />
        </button>
      )}

      <Carousel>
        {trendingAnimes.map((anime) => {
          const { id, title, trailer, description, coverImage } = anime;

          return (
            <CarouselContent
              key={id}
              style={{
                transform: `${
                  translateAction === 'next'
                    ? `translateX(${-slideCounter * slideWidth}rem)`
                    : translateAction === 'previous'
                    ? `translateX(${-slideCounter * slideWidth}rem)`
                    : 'translateX(0%)'
                }`,
              }}
            >
              {trailer ? (
                <ReactPlayer
                  controls={true}
                  width={playerWidth}
                  height={playerHeight}
                  onClickPreview={() => setIsPlaying(id)}
                  light={isPlaying !== id && `${coverImage.extraLarge}`}
                  playIcon={<BsFillPlayFill />}
                  playing={isPlaying === id ? true : false}
                  url={`https://www.youtube.com/watch?v=${trailer?.id}`}
                />
              ) : (
                <div>
                  <img
                    width={playerWidth}
                    height={playerHeight}
                    src={coverImage.extraLarge}
                    alt={title.english || title.romanji || title.native}
                  />
                </div>
              )}

              <Link href="/">
                <a>{title.english || title.romanji || title.native}</a>
              </Link>
            </CarouselContent>
          );
        })}
      </Carousel>

      {slideCounter < slideLimit && (
        <button
          onClick={() => handleCarouselButton('next', trendingAnimes.length)}
          type="button"
        >
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
