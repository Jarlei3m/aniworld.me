import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 30rem;
  height: 36rem;
  background-color: var(--gray-500);
  padding: 3rem 3.5rem;
  border-radius: 12px;
  position: absolute;
  box-shadow: 1px 1px 16px 6px rgba(0, 0, 0, 0.3);
  /* opacity: 0.99; */

  h1 {
    color: var(--green-500);
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;

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
        border-radius: 8px;
        border: none;
        outline: none;
        height: 3rem;
        padding: 0.5rem 1rem;

        &:focus {
          border-bottom: 3px solid var(--green-500);
        }

        &:checked {
          border-bottom: 3px solid var(--green-500);
        }
      }

      button {
        height: 4rem;
        margin-top: 2rem;
        border-radius: 0.5rem;
        border: none;
        background: var(--green-500);
        color: var(--white);
        font-size: 1.4rem;
        font-weight: bold;
        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
        }
      }

      &:nth-child(4) {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        display: inline;

        span {
          color: var(--gray-300);
        }

        a {
          margin-left: 0.5rem;
          color: var(--white);
          font-weight: bold;
          transition: filter 0.2s;

          &:hover {
            color: var(--green-500);
            text-decoration: underline;
          }
        }
      }

      &:last-child {
        width: 100%;
        text-align: center;
        margin-top: 1rem;

        strong {
          font-size: 1.2rem;
        }

        div {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 1rem;

          svg {
            font-size: 2.4rem;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              color: var(--green-500);
            }
          }
        }
      }
    }
  }
`;
