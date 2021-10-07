import styled from 'styled-components';

export const AnimeContainer = styled.main`
  max-width: calc(100vw - 15rem - 2.4rem);
  width: 100%;
  margin: 3.2rem 1.2rem;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;

  article {
    width: 100%;
    transform: translateY(-14rem);
    padding: 0 6rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    & + article {
      align-items: start;
      margin-top: 3rem;
      padding-right: unset;
    }

    p {
      display: flex;
      align-items: center;

      color: var(--gray-300);

      span {
        margin-left: 1rem;
      }

      span:nth-child(3) {
        svg {
          font-size: 0.8rem;
          color: var(--yellow-500);
          margin-right: 0.2rem;
        }
      }
    }
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 30rem;

  object-fit: cover;
  object-position: center center;

  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0.4)),
    to(rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));

  border-radius: 1rem;
  overflow: hidden;
`;

interface TitleProps {
  color: string;
}

export const Title = styled.h1<TitleProps>`
  font-size: 4rem;
  font-weight: 900;
  line-height: 5rem;
  text-transform: capitalize;

  background: -webkit-linear-gradient(
    var(--white),
    ${(props) => props.color || 'white'}
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const TrailerContent = styled.div`
  border-radius: 12px;
  overflow: hidden;
  width: 31rem;
  height: 17.5rem;
  font-size: 1rem;
  justify-self: right;

  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4);

  svg {
    font-size: 3rem;
  }
`;

export const Description = styled.div`
  font-size: 1rem;
  line-height: 1.375rem;
  color: var(--white);
`;

export const VoiceActorsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-left: 10rem;
  padding-right: 1.5rem;

  img {
    width: 5rem;
    height: 7rem;

    object-fit: cover;
    object-position: center center;

    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

    border-radius: 0.5rem;
    overflow: hidden;
  }

  li {
    display: flex;
    align-items: center;

    p {
      margin-left: 1rem;
      font-size: 0.875rem;
      white-space: nowrap;

      &:first-child {
        margin-bottom: 0.5rem;
      }

      span {
        color: var(--white);
        margin-left: 0.25rem;
      }
    }
  }
`;

export const EpisodesContainer = styled.section`
  width: 100%;
  transform: translateY(-14rem);
  margin-top: 1rem;
  padding: 0 2rem;

  h2 {
    font-size: 2.625rem;
    line-height: 6rem;
    color: var(--gray-300);
    width: 100%;

    border-bottom: 1px solid var(--gray-300);
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    gap: 1rem;
    margin-top: 1rem;

    li {
      width: 22rem;
      height: 20rem;
      transition: all 0.2s ease;

      div {
        border-radius: 4px;
        overflow: hidden;
      }

      &:hover {
        div {
          border: 1px solid var(--green-500);
        }
      }

      svg {
        font-size: 3rem;
      }

      p {
        color: var(--gray-300);
        margin-top: 0.5rem;
        font-size: 0.875rem;
      }
    }
  }
`;
