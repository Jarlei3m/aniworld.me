import { useContext, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPlayer from 'react-player';
import onGoingData from '../../../../../onGoing.json';
import { CarouselSlideContext } from '../../../../contexts/CarouselSlide/CarouselSlideContext';
import { Carousel, CarouselContent, Container } from './styles';

export function OnGoing() {
  const [isPlaying, setIsPlaying] = useState(0);
  const [onGoing, setOnGoing] = useState(onGoingData);

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
      <h2>On Going</h2>

      {slideCounter > 0 && (
        <button
          onClick={() => handleCarouselButton('previous', onGoing.length)}
          type="button"
        >
          <MdKeyboardArrowLeft />
        </button>
      )}

      <Carousel>
        {onGoing.map((anime, index) => {
          const { id, image_src, title, episode_src, last_seen } = anime;

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
              <ReactPlayer
                controls={true}
                width={playerWidth}
                height="160px"
                onClickPreview={() => setIsPlaying(id)}
                light={isPlaying !== id && image_src}
                playIcon={<BsFillPlayFill />}
                playing={isPlaying === id ? true : false}
                url={episode_src}
              />

              <h4>{title}</h4>
              <span>{last_seen}</span>
            </CarouselContent>
          );
        })}
      </Carousel>

      {slideCounter < slideLimit && (
        <button
          onClick={() => handleCarouselButton('next', onGoing.length)}
          type="button"
        >
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
