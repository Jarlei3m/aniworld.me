import styled from 'styled-components';

export const Container = styled.section`
  max-width: 100vw;
  width: 100%;
  height: 28rem;
  margin-top: 1.5rem;
  /* padding-bottom: 1.6rem; */
  position: relative;

  @media (max-width: 1024px) {
    height: 28rem;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 1rem;

    span {
      font-size: 0.8rem;
      color: var(--gray-300);
      margin-left: 0.5rem;
      transition: color 0.2s ease;

      &:hover {
        color: var(--green-500);
      }
    }
  }

  button {
    position: absolute;
    height: 22rem;
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
      height: 23.5rem;
      width: 2.125rem;
    }

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
  }
`;

export const Carousel = styled.ul`
  display: flex;

  width: 100%;
  height: 26rem;

  overflow: hidden;
`;

export const CarouselContent = styled.li`
  max-width: 19.5rem;
  transition: all 1s ease;

  & + li {
    margin-left: 0.9rem;
  }

  div {
    border-radius: 12px;
    overflow: hidden;

    img {
      object-fit: cover;
      object-position: center center;
      border-radius: 12px;
    }

    iframe,
    video {
      /* height: 22rem !important; */
      /* width: 22rem !important; */
      cursor: pointer;
    }

    svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  a {
    font-size: 0.925rem;
    font-weight: bold;
    margin-top: 0.5rem;
    cursor: pointer;
    display: inline-block;
    transition: color 0.2s ease;

    &:hover {
      color: var(--green-500);
    }
  }
`;
