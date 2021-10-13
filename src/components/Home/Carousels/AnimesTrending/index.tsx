import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { CarouselSlideContext } from '../../../../contexts/CarouselSlide/CarouselSlideContext';
import { TrendingContext } from '../../../../contexts/TrendingContext';
import {
  Carousel,
  CarouselContent,
  Container,
  SlideCarouselButton,
} from './styles';

export function AnimesTrending() {
  const [isPlaying, setIsPlaying] = useState(0);
  const { trendingAnimes } = useContext(TrendingContext);

  const [slideCounter, setSlideCounter] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  const { slideWidth, slideLimit, playerWidth, playerHeight } =
    useContext(CarouselSlideContext);

  const handleCarouselButton = (action: string, length: number) => {
    const lastIndex = length - 1;

    if (action === 'next' && slideCounter < lastIndex) {
      setTranslateAction(action);
      setSlideCounter(slideCounter + 1);
    }

    if (action === 'previous' && slideCounter > 0) {
      setTranslateAction(action);
      setSlideCounter(slideCounter - 1);
    }
  };

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
        <SlideCarouselButton
          onClick={() =>
            handleCarouselButton('previous', trendingAnimes.length)
          }
          type="button"
          buttonHeight={playerHeight}
        >
          <MdKeyboardArrowLeft />
        </SlideCarouselButton>
      )}

      <Carousel>
        {trendingAnimes.map((anime) => {
          const { id, title, trailer, coverImage, slug } = anime;

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

              {slug ? (
                <Link href={`/anime-list/${slug}`}>
                  <a>{title.english || title.romanji || title.native}</a>
                </Link>
              ) : (
                <p>{title.english || title.romanji || title.native}</p>
              )}
            </CarouselContent>
          );
        })}
      </Carousel>

      {slideCounter < slideLimit && (
        <SlideCarouselButton
          onClick={() => handleCarouselButton('next', trendingAnimes.length)}
          type="button"
          buttonHeight={playerHeight}
        >
          <MdKeyboardArrowRight />
        </SlideCarouselButton>
      )}
    </Container>
  );
}
