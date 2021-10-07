import styled from 'styled-components';

export const Container = styled.section`
  max-width: 100vw;
  width: 100%;
  height: 32rem;
  position: relative;

  @media (max-width: 1024px) {
    height: 28rem;
  }
`;

export const Carousel = styled.div`
  display: flex;

  height: 32rem;
  /* max-width: 77.5rem; */
  width: 100%;
  margin: 0 auto;

  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4);

  @media (max-width: 1024px) {
    height: 28rem;
  }
`;

interface CarouselProps {
  translateX: number;
}

export const CarouselContent = styled.article<CarouselProps>`
  position: absolute;
  width: 100%;
  transition: all 0.9s ease;

  // background image
  img {
    /* max-width: 77.5rem; */
    width: 100%;
    height: 32rem;

    object-fit: cover;
    object-position: center center;
    filter: brightness(0.7) grayscale(70%);
    -webkit-filter: brightness(0.7) grayscale(70%);

    @media (max-width: 1024px) {
      height: 28rem;
    }
  }

  // anime infos
  div {
    position: absolute;
    bottom: 7rem;
    left: 6rem;
    max-width: 27.5rem;
    padding: 0 1.5rem;
    text-align: left;

    @media (max-width: 1440px) {
      left: 4rem;
    }

    @media (max-width: 1024px) {
      bottom: 5rem;
      left: 2rem;
      max-width: 26rem;
    }

    @media (max-width: 768px) {
      max-width: 24.5rem;
    }

    h4 {
      font-size: 0.925rem;
      font-weight: 400;

      time {
        color: var(--gray-300);
      }
    }

    div {
      padding: 0;
      position: unset;
      max-width: unset;
      display: inline-block;
    }

    p {
      margin: 1.2rem 0;
      color: var(--gray-300);
      line-height: 1.2rem;
    }

    button {
      height: 3rem;
      width: 10rem;
      background: var(--white);
      color: var(--green-300);
      border: none;
      border-radius: 16px;
      font-weight: 700;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

interface AnimeTitleProps {
  color: string;
}

export const AnimeTitle = styled.h1<AnimeTitleProps>`
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 4rem;
  background: -webkit-linear-gradient(
    var(--white),
    ${(props) => props.color || 'white'}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const CarouselButtonContainer = styled.ul`
  position: absolute;
  bottom: 0;
  width: 100%;

  padding: 1.25rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

interface ButtonProps {
  isActive: boolean;
}

export const Button = styled.li<ButtonProps>`
  height: 0.725rem;
  width: 0.725rem;
  border-radius: 50%;
  background: var(--white);
  text-align: center;
  cursor: pointer;

  transition: opacity 0.25s ease;
  opacity: ${(props) => (props.isActive ? '1' : '0.3')};

  & + li {
    margin-left: 1rem;
  }

  &:hover {
    opacity: 1;
  }
`;
