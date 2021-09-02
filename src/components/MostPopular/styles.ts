import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 3rem;

  ul {
    margin: 2.2rem 0;

    li {
      display: flex;
      align-items: center;
      cursor: pointer;

      & + li {
        margin-top: 2rem;
      }

      img {
        /* max-height: 5.6rem; */
        /* max-width: 5.2rem; */
        /* width: auto; */
        /* width: 100%;
          height: auto; */
        width: 4.2rem;
        height: 5.8rem;
        border-radius: 6px;

        object-fit: cover;
        object-position: center;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2);
      }

      article {
        height: 5.8rem;
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
