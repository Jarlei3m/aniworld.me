import styled from 'styled-components';

export const Container = styled.section`
  max-width: 100vw;
  width: 100%;
  height: 16.5rem;
  margin-top: 3rem;
  position: relative;
  /* overflow: hidden; */

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  button {
    position: absolute;
    height: 10rem;
    width: 2rem;
    z-index: 3;
    border: none;
    border-radius: 12px 0 0 12px;
    background: rgba(0, 0, 0, 0.3);
    transition: background 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1024px) {
      height: 10.75rem;
      width: 2.125rem;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }

    &:nth-child(2) {
      top: 2.3rem;
      left: 0;
      /* border-radius: 0 12px 12px 0; */
    }

    &:last-child {
      top: 2.3rem;
      right: 0;
      /* border-radius: 12px 0 0 12px; */
    }

    svg {
      font-size: 2.5rem;
      z-index: 3;
      color: var(--white);
    }
  }
`;

export const Carousel = styled.ul`
  display: flex;
  align-items: center;

  /* height: 16.5rem; */
  /* max-width: 77.5rem; */
  width: 100%;

  overflow: hidden;
  /* position: relative; */
`;

export const CarouselContent = styled.li`
  max-width: 17.75rem;
  /* max-height: 13rem; */
  /* border-radius: 12px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden; */
  transition: all 1s ease;

  div {
    border-radius: 12px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    iframe,
    video {
      /* border-radius: 12px; */
      cursor: pointer;
    }
  }

  & + li {
    margin-left: 0.9rem;

    @media (min-width: 2500px) {
      margin-left: 2.175rem;
    }

    /* @media (max-width: 1080px) {
      margin-left: 2.1rem;
    } */
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
