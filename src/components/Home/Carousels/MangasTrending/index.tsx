import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { CarouselSlideContext } from '../../../../contexts/CarouselSlide/CarouselSlideContext';
import { TrendingContext } from '../../../../contexts/TrendingContext';
import { Carousel, CarouselContent, Container } from './styles';

export function MangasTrending() {
  const [isPlaying, setIsPlaying] = useState(0);

  const [slideCounter, setSlideCounter] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  const { trendingMangas } = useContext(TrendingContext);
  const { slideWidth, slideLimit, playerWidth, playerHeight } =
    useContext(CarouselSlideContext);

  function handleCarouselButton(action: string) {
    const lastIndex = trendingMangas.length - 1;

    if (action === 'next' && slideCounter < lastIndex) {
      setTranslateAction(action);
      setSlideCounter(slideCounter + 1);
    }

    if (action === 'previous' && slideCounter > 0) {
      setTranslateAction(action);
      setSlideCounter(slideCounter - 1);
    }
  }

  return (
    <Container>
      <h2>
        Mangas on Trending
        <span title="See more trending topics mangas">
          <Link href="/trending">
            <a>see more</a>
          </Link>
        </span>
      </h2>

      {slideCounter > 0 && (
        <button onClick={() => handleCarouselButton('previous')} type="button">
          <MdKeyboardArrowLeft />
        </button>
      )}

      <Carousel>
        {trendingMangas.map((manga) => {
          const { id, title, trailer, description, coverImage } = manga;

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
        <button onClick={() => handleCarouselButton('next')} type="button">
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
