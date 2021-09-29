import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  height: 16.5rem;
  margin-top: 3rem;
  overflow: hidden;

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  section {
    display: flex;
    align-items: center;
    /* justify-content: center; */

    div {
      max-width: 17.75rem;
      max-height: 10rem;
      border-radius: 12px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

      & + div {
        margin-left: 1.5rem;
      }

      iframe,
      video {
        width: 17.75rem;
        height: 10rem;
        border-radius: 12px;
        cursor: pointer;
      }

      svg {
        width: 2.6rem;
        height: 2.6rem;
      }

      h4 {
        font-size: 0.925rem;
        margin-top: 0.5rem;
      }

      span {
        font-size: 0.8rem;
        color: var(--gray-300);
      }
    }
  }
`;
