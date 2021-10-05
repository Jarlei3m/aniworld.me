import { createContext, ReactNode, useState } from 'react';

interface CarouselSlideContextData {
  slideWidth: number;
  slideLimit: number;
  playerWidth: string;
  playerHeight: string;
  slideCounter: number;
  translateAction: string;
  handleWindowResize: (ref: number, arrayLength: number) => void;
  handleCarouselButton: (action: string, length: number) => void;
}

interface CarouselSlideProviderProps {
  children: ReactNode;
}

export const CarouselSlideContext = createContext<CarouselSlideContextData>(
  {} as CarouselSlideContextData,
);

export function CarouselSlideProvider({
  children,
}: CarouselSlideProviderProps) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideLimit, setSlideLimit] = useState(0);

  const [slideCounter, setSlideCounter] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  const [playerWidth, setPlayerWidth] = useState('280px');
  const [playerHeight, setPlayerHeight] = useState('352px');

  const handleWindowResize = (ref: number, arrayLength: number) => {
    // section size received in px, divide by 16 to get the value in rem
    let sectionWidth = ref / 16;

    if (sectionWidth > 120) {
      // 4K - 2560PX
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('304.6px');

      const videoSize = 304.6 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 70) {
      // 1440px
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('280.6px');

      const videoSize = 280 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 60) {
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('240px');

      const videoSize = 240 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 47) {
      setSlideWidth(sectionWidth + 1);
      setPlayerWidth('230px');

      const videoSize = 230 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    }
  };

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
    <CarouselSlideContext.Provider
      value={{
        slideWidth,
        slideLimit,
        playerWidth,
        playerHeight,
        slideCounter,
        translateAction,
        handleWindowResize,
        handleCarouselButton,
      }}
    >
      {children}
    </CarouselSlideContext.Provider>
  );
}
