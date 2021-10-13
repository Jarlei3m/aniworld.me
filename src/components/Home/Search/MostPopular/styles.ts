import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }

  h1 {
    font-size: 1.25rem;
    color: var(--white);
    width: 100%;
    text-align: left;

    @media (max-width: 1440px) {
      font-size: 1.125rem;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  ul {
    margin: 2rem 0;

    @media (max-width: 1440px) {
      margin: 1.5rem 0;
    }

    li {
      display: flex;
      align-items: center;
      cursor: pointer;

      & + li {
        margin-top: 2rem;

        @media (max-width: 1440px) {
          margin-top: 1.5rem;
        }
      }

      &:hover {
        strong {
          color: var(--green-500);
        }
      }

      img {
        /* max-height: 5.6rem; */
        /* max-width: 5.2rem; */
        /* width: auto; */
        /* width: 100%;
          height: auto; */
        width: 4rem;
        height: 5.75rem;
        border-radius: 0.375rem;

        object-fit: cover;
        object-position: center;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2);

        @media (max-width: 1440px) {
          width: 3.75rem;
          height: 5.5rem;
        }

        @media (max-width: 1024px) {
          width: 3.5rem;
          height: 5.25rem;

          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          width: 3.25rem;
          height: 5rem;
        }
      }

      article {
        height: 5.75rem;
        margin-left: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 1440px) {
          height: 5.5rem;
          margin-left: 0.875rem;
        }

        @media (max-width: 1024px) {
          height: 5.25rem;
          margin-left: 0.8125rem;
        }

        @media (max-width: 768px) {
          height: 5rem;
          margin-left: 0.75rem;
        }

        div {
          strong {
            transition: color 0.2s;
            cursor: pointer;

            font-size: 0.875rem;
            color: var(--white);

            @media (max-width: 1024px) {
              font-size: 0.8125rem;
            }

            &:hover {
              color: var(--green-500);
            }
          }

          p {
            font-size: 0.8125rem;
            color: var(--gray-300);
            line-height: 1.125rem;

            @media (max-width: 1024px) {
              font-size: 0.75rem;
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
