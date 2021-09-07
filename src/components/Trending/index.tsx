import { useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import { Container, InfoContainer } from './styles';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { TrendingContext } from '../../contexts/TrendingContext';

export function Trending() {
  const [animePlaying, setAnimePlaying] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const [translateAction, setTranslateAction] = useState('');
  const [slideCounter, setSlideCounter] = useState(0);

  const { trendingAnimes, handleLoadMoreTrendingData } =
    useContext(TrendingContext);

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
      handleLoadMoreTrendingData(slideCounter);
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
    <Container id="trending">
      <h2>Trending</h2>

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
          {trendingAnimes.map((anime) => {
            const { id, title, trailer, description, coverImage } = anime;
            return (
              <li key={id}>
                <ReactPlayer
                  controls={true}
                  onMouseEnter={() => handleOnMouseHover(id)}
                  onMouseLeave={handleOnMouseLeave}
                  light={animePlaying !== id && `${coverImage.extraLarge}`}
                  playIcon={<BsFillPlayFill />}
                  playing={animePlaying === id ? true : false}
                  muted={animePlaying === id ? true : false}
                  url={
                    trailer
                      ? `https://www.youtube.com/watch?v=${trailer?.id}`
                      : null
                  }
                />

                <h4>{title.english ? title.english : title.romanji}</h4>
                <span>Trailer</span>
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
