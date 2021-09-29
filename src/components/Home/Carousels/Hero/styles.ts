import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  height: 32rem;
  margin: 0 auto;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4);

  .carousel-root {
    height: 100%;

    .carousel {
      position: absolute;
      height: 100%;

      .thumbs-wrapper,
      .control-arrow {
        display: none;
      }

      .slider-wrapper.axis-horizontal {
        transform: translateY(-10%);
      }

      ul {
        margin: 1rem 0;

        &.control-dots li.dot {
          width: 0.725rem;
          height: 0.725rem;
        }
      }
    }
  }

  div {
    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
      filter: brightness(0.7) grayscale(70%);
      -webkit-filter: brightness(0.7) grayscale(70%);
    }

    article {
      position: absolute;
      top: 25%;
      margin-left: 6rem;
      text-align: left;
      width: 26rem;

      h4 {
        font-size: 0.925rem;
        font-weight: 400;

        span {
          color: var(--gray-300);
        }
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 900;
        line-height: 4rem;
        /* color: linear-gradient(to bottom, var(--white), #5c2121); */
        background: -webkit-linear-gradient(var(--white), #5c2121);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      svg {
        color: var(--yellow-500);
        & + svg {
          margin-left: 0.2rem;
        }
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
  }
`;
