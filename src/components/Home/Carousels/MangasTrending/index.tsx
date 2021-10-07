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
  const { trendingMangas } = useContext(TrendingContext);

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
        Mangas on Trending
        <span title="See more trending topics mangas">
          <Link href="/trending">
            <a>see more</a>
          </Link>
        </span>
      </h2>

      {slideCounter > 0 && (
        <button
          onClick={() =>
            handleCarouselButton('previous', trendingMangas.length)
          }
          type="button"
        >
          <MdKeyboardArrowLeft />
        </button>
      )}

      <Carousel>
        {trendingMangas.map((manga) => {
          const { id, title, trailer, slug, externalLinks, coverImage } = manga;

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
                <Link href={`/manga-list/${slug}`}>
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
        <button
          onClick={() => handleCarouselButton('next', trendingMangas.length)}
          type="button"
        >
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
