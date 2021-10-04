import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { TrendingContext } from '../../../../contexts/TrendingContext';
import { Carousel, CarouselContent, Container } from './styles';

export function AnimesTrending() {
  const [isPlaying, setIsPlaying] = useState(0);

  const [slideCounter, setSlideCounter] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  const [slideWidth, setSlideWidth] = useState(0);
  const [slideLimit, setSlideLimit] = useState(0);

  const [playerWidth, setPlayerWidth] = useState('280px');
  const [playerHeight, setPlayerHeight] = useState('352px');

  const { trendingAnimes } = useContext(TrendingContext);

  const ref = useRef(null);

  const handleResize = () => {
    // section size received in px, divide by 16 to get the value in rem
    let sectionWidth = ref.current.offsetWidth / 16;

    if (sectionWidth > 120) {
      // 4K - 2560PX
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('304.6px');

      const videoSize = 304.6 / 16;
      const limit =
        (trendingAnimes.length || 20) / Math.round(sectionWidth / videoSize) -
        1;
      setSlideLimit(limit);
    } else if (sectionWidth > 70) {
      // 1440px
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('280.6px');

      const videoSize = 280 / 16;
      const limit =
        (trendingAnimes.length || 20) / Math.round(sectionWidth / videoSize) -
        1;
      setSlideLimit(limit);
    } else if (sectionWidth > 60) {
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('240px');

      const videoSize = 240 / 16;
      const limit =
        (trendingAnimes.length || 20) / Math.round(sectionWidth / videoSize) -
        1;
      setSlideLimit(limit);
    } else if (sectionWidth > 47) {
      setSlideWidth(sectionWidth + 1);
      setPlayerWidth('230px');

      const videoSize = 230 / 16;
      const limit =
        (trendingAnimes.length || 20) / Math.round(sectionWidth / videoSize) -
        1;
      setSlideLimit(limit);
    }
  };

  // listen window resize
  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('load', handleResize);
  });

  async function handleCarouselButton(action: string) {
    const lastIndex = trendingAnimes.length - 1;

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
    <Container ref={ref}>
      <h2>
        Animes on Trending
        <span title="See more trending topics animes">
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
        <button onClick={() => handleCarouselButton('next')} type="button">
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
