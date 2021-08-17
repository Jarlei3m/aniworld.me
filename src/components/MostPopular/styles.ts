import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 3rem;

  ul {
    margin: 2rem 0;

    li {
      display: flex;
      align-items: center;

      & + li {
        margin-top: 2rem;
      }

      img {
        height: 5.2rem;
        /* width: 5.2rem; */
        /* width: auto; */
        border-radius: 6px;
      }

      article {
        height: 5.6rem;
        margin-left: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
          h4 {
            font-size: 0.875rem;
            color: var(--white);
          }

          p {
            font-size: 0.8rem;
            color: var(--gray-300);
            line-height: 1.125rem;
          }
        }

        span {
          svg {
            color: var(--yellow-500);
            height: 1.1rem;
            width: 1.1rem;
            & + svg {
              margin-left: 0.4rem;
            }
          }
        }
      }
    }
  }

  button {
    width: 100%;
    height: 2.5rem;
    background: var(--green-300);
    border: none;
    border-radius: 12px;

    color: var(--white);
    font-size: 0.925rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
