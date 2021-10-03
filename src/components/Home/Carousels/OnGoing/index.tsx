import onGoingData from '../../../../../onGoing.json';
import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { Carousel, CarouselContent, Container } from './styles';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export function OnGoing() {
  const [isPlaying, setIsPlaying] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [slideCounter, setSlideCounter] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  const [onGoing, setOnGoing] = useState(onGoingData);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideLimit, setSlideLimit] = useState(0);

  const [playerWidth, setPlayerWidth] = useState('280px');
  const [playerHeight, setPlayerHeight] = useState('160px');

  const ref = useRef(null);

  const handleResize = () => {
    // section size received in px, divide by 16 to get the value in rem

    let sectionWidth = ref.current.offsetWidth / 16;

    if (sectionWidth > 120) {
      // 4K - 2560PX
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('304.6px');

      const videoSize = 304.6 / 16;
      const limit = onGoing.length / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 70) {
      // 1440px
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('280.6px');

      const videoSize = 280 / 16;
      const limit = onGoing.length / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 60) {
      // 1440px
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('240px');

      const videoSize = 240 / 16;
      const limit = onGoing.length / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 47) {
      // 1440px
      setSlideWidth(sectionWidth + 1);
      setPlayerWidth('230px');

      const videoSize = 230 / 16;
      const limit = onGoing.length / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    }

    console.log('section width:', sectionWidth);

    // const limit = onGoing.length / Math.round(sectionWidth / 17.75) - 1;
    // setSlideLimit(limit);
  };

  // listen window resize
  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('load', handleResize);
  });

  console.log('slideLimit:', slideLimit);

  function handleCarouselButton(action: string) {
    const lastIndex = onGoingData.length - 1;

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
      <h2>On Going</h2>

      {slideCounter > 0 && (
        <button onClick={() => handleCarouselButton('previous')} type="button">
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
                height={playerHeight}
                // onMouseEnter={() => handleOnMouseHover()}
                // onMouseLeave={() => handleOnMouseLeave()}
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
        <button onClick={() => handleCarouselButton('next')} type="button">
          <MdKeyboardArrowRight />
        </button>
      )}
    </Container>
  );
}
