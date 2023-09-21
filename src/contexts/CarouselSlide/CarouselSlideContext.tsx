import { createContext, ReactNode, useState } from 'react';

interface CarouselSlideContextData {
  slideWidth: number;
  slideLimit: number;
  playerWidth: string;
  playerHeight: string;
  onGoingPlayerHeight: string;
  handleWindowResize: (ref: number, arrayLength: number) => void;
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

  const [playerWidth, setPlayerWidth] = useState('280px');
  const [playerHeight, setPlayerHeight] = useState('352px');
  const [onGoingPlayerHeight, setOnGoingPlayerHeight] = useState('160px');

  const handleWindowResize = (ref: number, arrayLength: number) => {
    // section size received in px, divide by 16 to get the value in rem
    let sectionWidth = ref / 16;

    if (sectionWidth > 110) {
      // 4K - 2560PX
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('304.6px');

      const videoSize = 304.6 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 70) {
      //
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('280.6px');
      setPlayerHeight('352px');
      setOnGoingPlayerHeight('160px');

      const videoSize = 280.6 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 50) {
      setSlideWidth(sectionWidth - 2);
      setPlayerWidth('196.2px');
      setPlayerHeight('247px');
      setOnGoingPlayerHeight('112px');

      const videoSize = 196.2 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 30) {
      setSlideWidth(sectionWidth + 0.375);
      setPlayerWidth('165.9px');
      setPlayerHeight('208px');
      setOnGoingPlayerHeight('94.3px');

      const videoSize = 165.9 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    } else if (sectionWidth > 20) {
      setSlideWidth(sectionWidth - 0.47);
      setPlayerWidth('157.3px');
      setPlayerHeight('196px');
      setOnGoingPlayerHeight('89px');

      const videoSize = 157.3 / 16;
      const limit =
        (arrayLength || 20) / Math.round(sectionWidth / videoSize) - 1;
      setSlideLimit(limit);
    }
  };

  return (
    <CarouselSlideContext.Provider
      value={{
        slideWidth,
        slideLimit,
        playerWidth,
        playerHeight,
        onGoingPlayerHeight,
        handleWindowResize,
      }}
    >
      {children}
    </CarouselSlideContext.Provider>
  );
}
