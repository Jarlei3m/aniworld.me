import styled from 'styled-components';

export const Container = styled.section`
  max-width: 100%;
  height: auto;
  margin-top: 1.5rem;
  padding-bottom: 1.6rem;
  overflow: hidden;

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

  div {
    display: flex;
    align-items: center;

    position: relative;

    button {
      position: absolute;
      height: 100%;
      width: 2.24rem;
      z-index: 3;
      border: none;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 12px 0 0 12px;
      transition: background 0.2s;

      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }

      &:last-child {
        right: 0;
      }

      &:first-child {
        left: 0;
      }

      svg {
        font-size: 2.5rem;
        z-index: 3;
        color: var(--white);
      }
    }
  }

  ul {
    display: flex;
    align-items: top;
    /* justify-content: center; */
    transition: transform 1s ease;

    &.translate {
      /* transform: translateX(-74.8rem); */
    }

    div {
      max-width: 100%;
      max-height: 100%;
      border-radius: 12px;
    }

    /* div, */
    li {
      width: 17.2rem;
      max-height: 18rem;
      border-radius: 12px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.2s;

      /* hover effect */
      /* &:hover {
        max-width: 20rem;
        max-height: 15rem;
        background-color: var(--gray-500);

        iframe,
        video {
          width: 20rem;
          height: 10rem;
          border-radius: 12px 12px 0 0;
        }
      } */

      & + li {
        margin-left: 1.5rem;
      }

      div:first-child {
        width: 100% !important;
        height: 18rem !important;

        img {
          width: 19.5rem;
          height: 18rem;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: 12px;
        }
      }

      iframe,
      video {
        width: 19.5rem;
        height: 18rem;
        border-radius: 12px;
        cursor: pointer;
        position: absolute;
        transform: translate3d(-1.15rem, 0, 0);
        z-index: 5;
      }

      svg {
        width: 2.6rem;
        height: 2.6rem;
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
    }
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 1rem;
`;
