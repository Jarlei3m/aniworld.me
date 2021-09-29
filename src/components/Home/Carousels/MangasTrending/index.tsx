import Link from 'next/link';
import { useContext, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { TrendingContext } from '../../../../contexts/TrendingContext';
import { Container } from './styles';

export function MangasTrending() {
  const [translateAction, setTranslateAction] = useState('');
  const [slideCounter, setSlideCounter] = useState(0);

  const { trendingMangas } = useContext(TrendingContext);

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
        <span title="See more trending topics mangas">
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
          {trendingMangas.map((manga) => {
            const { id, title, description, coverImage } = manga;
            return (
              <li key={id}>
                <div>
                  <img
                    src={coverImage.extraLarge}
                    alt={title.english || title.romanji || title.native}
                  />
                </div>

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
