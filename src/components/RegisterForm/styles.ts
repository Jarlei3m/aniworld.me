import styled from 'styled-components';

interface ContainerProps {
  translateX: string;
}

export const Container = styled.form<ContainerProps>`
  width: 30rem;
  height: 42rem;
  background-color: var(--gray-500);
  padding: 3rem 3.5rem;
  border-radius: 12px;
  position: absolute;
  box-shadow: 2px 2px 16px 6px rgba(0, 0, 0, 0.3);

  h1 {
    color: var(--green-500);
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  div {
    display: flex;
    flex-direction: column;

    & + div {
      margin-top: 1.6rem;
    }

    label {
      margin-bottom: 0.5rem;
    }

    input {
      border-radius: 0.5rem;
      border: none;
      outline: transparent;
      height: 3rem;
      padding: 0.5rem 1rem;
      width: 100%;
      color: var(--gray-500);
      font-size: 1rem;

      &:focus,
      &:valid {
        border-bottom: 3px solid var(--green-500);
      }
    }

    &:nth-child(4),
    &:nth-child(5) {
      position: relative;

      svg {
        position: absolute;
        right: 1rem;
        bottom: 0rem;
        height: 3rem;
        font-size: 1.25rem;
        /* top: 2.2rem; */
        color: var(--gray-300);
        cursor: pointer;
      }
    }

    &:last-child {
      margin-top: 0.3rem;
      font-size: 0.8rem;
      display: inline-block;

      span {
        color: var(--gray-300);
      }

      a {
        margin-left: 0.5rem;
        color: var(--white);
        font-weight: bold;
        transition: all 0.1s;

        &:hover {
          color: var(--green-500);
          text-decoration: underline;
        }
      }
    }

    /* &:last-child {
      width: 100%;
      text-align: center;
      margin-top: 1.6rem;

      strong {
        font-size: 1.2rem;
      }

      div {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        gap: 0.8rem;
        margin-top: 1.6rem;

        svg {
          font-size: 2.4rem;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            color: var(--green-500);
          }
        }
      }
    } */
  }

  button[type='submit'] {
    height: 4rem;
    margin-top: 2.6rem;
    padding: 0 1.5rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--green-500);
    color: var(--white);
    font-size: 1.4rem;
    font-weight: bold;
    width: 100%;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
