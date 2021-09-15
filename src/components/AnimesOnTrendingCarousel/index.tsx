import { useState, useContext } from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { Container, InfoContainer } from './styles';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { CarouselTrendingContext } from '../../contexts/CarouselTrendingContext';

export function AnimesOnTrendingCarousel() {
  const [animePlaying, setAnimePlaying] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const [translateAction, setTranslateAction] = useState('');
  const [slideCounter, setSlideCounter] = useState(0);

  const { carouselTrendingAnimes } = useContext(CarouselTrendingContext);

  function handleOnMouseHover(animeId: number) {
    setAnimePlaying(animeId);
    setIsMuted(false);
    setShowInfo(true);
  }

  function handleOnMouseLeave() {
    setAnimePlaying(0);
    setIsMuted(true);
    setShowInfo(false);
  }

  function handleCarouselButton(action: string) {
    if (action === 'next' && slideCounter < 4) {
      setTranslateAction(action);
      setSlideCounter((oldSlideCounter) => {
        return oldSlideCounter + 1;
      });
    }

    if (action === 'previous' && slideCounter > 0) {
      setTranslateAction(action);
      setSlideCounter((oldSlideCounter) => {
        return oldSlideCounter - 1;
      });
    }
  }

  console.log('slideCounter:', slideCounter);

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

      <div>
        {slideCounter > 0 && (
          <button
            onClick={() => handleCarouselButton('previous')}
            type="button"
          >
            <MdKeyboardArrowLeft />
          </button>
        )}

        <ul
          style={{
            transform: `${
              translateAction === 'next'
                ? `translateX(${slideCounter * -74.8}rem)`
                : translateAction === 'previous'
                ? `translateX(${slideCounter * -74.8}rem)`
                : 'translateX(0%)'
            }`,
          }}
        >
          {carouselTrendingAnimes.map((anime) => {
            const { id, title, trailer, description, coverImage } = anime;
            return (
              <li key={id}>
                {trailer ? (
                  <ReactPlayer
                    controls={true}
                    onMouseEnter={() => handleOnMouseHover(id)}
                    onMouseLeave={handleOnMouseLeave}
                    light={animePlaying !== id && `${coverImage.extraLarge}`}
                    playIcon={<BsFillPlayFill />}
                    playing={animePlaying === id ? true : false}
                    muted={animePlaying === id ? true : false}
                    url={`https://www.youtube.com/watch?v=${trailer?.id}`}
                  />
                ) : (
                  <div>
                    <img
                      src={coverImage.extraLarge}
                      alt={title.english || title.romanji || title.native}
                    />
                  </div>
                )}

                <Link href="/">
                  <a>{title.english || title.romanji || title.native}</a>
                </Link>
              </li>
            );
          })}
        </ul>

        {slideCounter < 3 && (
          <button onClick={() => handleCarouselButton('next')} type="button">
            <MdKeyboardArrowRight />
          </button>
        )}
      </div>
    </Container>
  );
}
