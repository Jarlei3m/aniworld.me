import { createContext, ReactNode, useState } from 'react';

interface CarouselSlideContextData {
  slideWidth: number;
  slideLimit: number;
  playerWidth: string;
  playerHeight: string;
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

  return (
    <CarouselSlideContext.Provider
      value={{
        slideWidth,
        slideLimit,
        playerWidth,
        playerHeight,
        handleWindowResize,
      }}
    >
      {children}
    </CarouselSlideContext.Provider>
  );
}
