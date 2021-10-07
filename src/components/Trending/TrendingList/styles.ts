import styled from 'styled-components';

export const TrendingListContainer = styled.section`
  width: 100%;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 2rem;
    width: 22rem;
    height: 2.8rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--gray-500);
    color: var(--white);
    font-weight: bold;
    transition: filter 0.2s ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-wrap: wrap;
  row-gap: 1.8rem;
  column-gap: 1.8rem;
`;

interface ItemProps {
  isPlaying: boolean;
}

export const ListItem = styled.li<ItemProps>`
  width: 18rem;
  height: 20rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--gray-100);
  position: relative;

  @media (max-width: 2560px) {
    width: 22.2rem;
  }

  @media (max-width: 1440px) {
    width: 16.7rem;
  }

  @media (max-width: 1024px) {
    width: 15.6rem;
  }

  small {
    position: absolute;
    font-weight: bold;
    font-size: 0.7rem;
    top: 0;
    left: 0;
    background-color: var(--gray-500);
    padding: 0.5rem;
    border-radius: 12px 0px 12px 0px;
    /* z-index: 9999; */
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    color: var(--green-500);
  }

  img {
    width: 18rem;
    height: 14rem;
    object-fit: cover;
    object-position: center;
    display: block;

    @media (max-width: 2560px) {
      width: 22.2rem;
    }

    @media (max-width: 1440px) {
      width: 16.7rem;
    }

    @media (max-width: 1024px) {
      width: 15.6rem;
    }
  }

  iframe,
  video {
    width: 18rem;
    height: 14rem;

    @media (max-width: 2560px) {
      width: 22.2rem;
    }

    @media (max-width: 1440px) {
      width: 16.7rem;
    }

    @media (max-width: 1024px) {
      width: 15.6rem;
    }

    svg {
      font-size: 2.6rem;
    }
  }

  div:first-child {
    width: 100% !important;
    height: 14rem !important;
  }
`;

export const Info = styled.div`
  padding: 0 1rem;
  height: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    font-size: 0.925rem;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    transition: color 0.2s ease;

    &:hover {
      color: var(--green-500);
    }
  }

  article {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    margin-top: 0.4rem;

    time {
      color: var(--gray-300);
      margin-left: 0.5rem;
    }

    span {
      color: var(--gray-300);

      &:first-child {
        display: flex;
        align-items: center;

        svg {
          font-size: 0.7rem;
          color: var(--yellow-500);
          margin-right: 0.2rem;
        }
      }

      & + span {
        margin-left: 0.5rem;
      }
    }
  }
`;
