import styled from 'styled-components';

export const Container = styled.section`
  max-width: 100vw;
  width: 100%;
  height: 16.5rem;
  margin-top: 3rem;
  position: relative;

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
`;

export const Carousel = styled.ul`
  display: flex;
  align-items: center;

  width: 100%;

  overflow: hidden;
`;

export const CarouselContent = styled.li`
  transition: all 1s ease;
  width: 100%;

  div {
    border-radius: 0.75rem;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    iframe,
    video {
      cursor: pointer;
    }
  }

  & + li {
    margin-left: 0.9rem;
  }

  img {
    object-fit: cover;
    object-position: center center;
  }

  svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  h4 {
    font-size: 0.925rem;
    margin-top: 0.5rem;
  }

  span {
    font-size: 0.8rem;
    color: var(--gray-300);
  }
`;

interface ButtonProps {
  buttonHeight: string;
}

export const SlideCarouselButton = styled.button<ButtonProps>`
  position: absolute;
  height: ${(props) => props.buttonHeight};
  width: 2rem;
  z-index: 3;
  border: none;
  border-radius: 12px 0 0 12px;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  &:nth-child(2) {
    top: 2.3rem;
    left: 0;
  }

  &:last-child {
    top: 2.3rem;
    right: 0;
  }

  svg {
    font-size: 2.5rem;
    z-index: 3;
    color: var(--white);
  }
`;
