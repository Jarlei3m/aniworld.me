import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import {
  Container,
  Carousel,
  CarouselButtonContainer,
  CarouselContent,
  Button,
  AnimeTitle,
} from './styles';
import heroData from '../../../../../hero.json';
import { useEffect, useState } from 'react';
import { Stars } from '../../../Stars';

export function Hero() {
  const [heros, setHeros] = useState(heroData);

  const [slideSelected, setSlideSelected] = useState(0);
  const [translateAction, setTranslateAction] = useState('');

  useEffect(() => {
    const lastIndex = heros.length - 1;

    if (slideSelected < lastIndex) {
      setSlideSelected(slideSelected);
      setTranslateAction('next');
    }

    if (slideSelected > lastIndex) {
      setSlideSelected(0);
      setTranslateAction('');
    }
  }, [slideSelected]);

  useEffect(() => {
    let slider = setInterval(() => {
      setSlideSelected(slideSelected + 1);
    }, 5000);

    return () => clearInterval(slider);
  }, [slideSelected]);

  return (
    <Container>
      <Carousel>
        {heros.map((hero, index) => {
          const {
            id,
            image_src,
            title,
            year,
            season,
            description,
            score,
            trailer_src,
            color,
          } = hero;

          return (
            <CarouselContent
              translateX={index}
              key={id}
              style={{
                transform: `${
                  translateAction === 'next'
                    ? `translateX(${(index - slideSelected) * 100}%)`
                    : `translateX(${index * 100}%)`
                }`,
              }}
            >
              <>
                <img src={image_src} alt={title} />
                <div>
                  <h4>
                    {season} • <time>{year}</time>
                  </h4>
                  <AnimeTitle color={color}>{title}</AnimeTitle>
                  <Stars averageScore={score} />
                  <p>{description}</p>
                  <button type="button">Watch</button>
                </div>
              </>
            </CarouselContent>
          );
        })}
      </Carousel>

      <CarouselButtonContainer>
        {heros.map((hero, index) => {
          return (
            <Button
              key={hero.id}
              isActive={slideSelected === index}
              onClick={() => setSlideSelected(index)}
            ></Button>
          );
        })}
      </CarouselButtonContainer>
    </Container>
  );
}
