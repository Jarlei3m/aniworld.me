import { useState, useContext } from 'react';
import Link from 'next/link';
import { Container, InfoContainer } from './styles';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { CarouselTrendingContext } from '../../contexts/CarouselTrendingContext';

export function MangasOnTrendingCarousel() {
  const [translateAction, setTranslateAction] = useState('');
  const [slideCounter, setSlideCounter] = useState(0);

  const { carouselTrendingMangas } = useContext(CarouselTrendingContext);

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

  return (
    <Container>
      <h2>
        Mangas on Trending
        <span title="See more trending topics animes">
          <Link href="/trending"> see more </Link>
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
          {carouselTrendingMangas.map((manga) => {
            const { id, title, description, coverImage } = manga;
            return (
              <li key={id}>
                <div>
                  <img
                    src={coverImage.extraLarge}
                    alt={title.english || title.romanji}
                  />
                </div>

                <Link href="/">
                  <a>{title.english ? title.english : title.romanji}</a>
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
