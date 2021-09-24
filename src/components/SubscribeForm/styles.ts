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
    position: relative;

    & + div {
      margin-top: 1.6rem;
    }

    label {
      margin-bottom: 0.5rem;
    }

    /* input {
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
    } */

    /* small {
      position: absolute;
      left: 0.4rem;
      bottom: 0;
      color: red;
      transform: translateY(1rem);
      transition: all 0.3s ease;

      &.valid {
        transform: translateY(0);
      }
    } */

    &:nth-child(4),
    &:nth-child(5) {
      /* position: relative; */

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

interface ValidProps {
  isValid: boolean;
}

export const InputBox = styled.input<ValidProps>`
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
    /* border-bottom: 3px solid var(--green-500); */
    border-bottom: 3px solid
      ${(props) => (props.isValid ? '#84f8b8' : '#cc5662')};
  }
`;

export const WarningMessage = styled.small<ValidProps>`
  position: absolute;
  left: 0.4rem;
  bottom: -0.5rem;
  color: var(--red-500);
  font-size: 0.8rem;

  transition: all 0.5s ease;

  ${(props) =>
    props.isValid
      ? `
      visibility: hidden;
      opacity: 0;
      transform: translateY(0rem)
    `
      : `
      visibility: visible;
      opacity: 1;
      transform: translateY(.6rem)
    `}
`;
