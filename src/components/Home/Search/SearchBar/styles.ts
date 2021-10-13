import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* justify-content: space-between; */

  form {
    background: var(--gray-100);
    border-radius: 1.25rem;
    width: 15rem;

    display: flex;
    align-items: center;
    padding: 0 1.4rem;

    @media (max-width: 1440px) {
      width: 13rem;
      padding: 0 1rem;
    }

    @media (max-width: 1024px) {
      width: 10rem;
      padding: 0 1rem;
    }

    @media (max-width: 768px) {
      width: 9rem;
      padding: 0 0.875rem;
    }

    label {
      display: flex;
      align-items: center;
    }

    svg {
      height: 1.6rem;
      width: 1.6rem;
      color: var(--gray-300);

      @media (max-width: 1024px) {
        height: 1.5rem;
        width: 1.5rem;
      }

      @media (max-width: 768px) {
        height: 1.25rem;
        width: 1.25rem;
      }
    }

    input {
      background: transparent;
      border: none;
      height: 2.5rem;
      width: 10rem;
      outline: none;
      padding: 0 0.5rem;

      color: var(--white);
      font-size: 0.875rem;

      @media (max-width: 1024px) {
        height: 2.375rem;
      }

      @media (max-width: 768px) {
        height: 2.25rem;
      }
    }
  }

  div {
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--white);
    border-radius: 50%;
    overflow: hidden;
    margin-left: 0.5rem;

    @media (max-width: 1024px) {
      width: 2.375rem;
      height: 2.375rem;
      margin-left: 0.25rem;
    }

    @media (max-width: 768px) {
      width: 2.25rem;
      height: 2.25rem;
    }

    img {
      /* height: 2.6rem;
      width: 2.6rem; */

      /* border: 1px solid red !important; */
      /* object-fit: cover;
      object-position: center; */
      border-radius: 50%;
      padding: 1px !important;
    }
  }
`;
