import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;

  form {
    background: var(--gray-100);
    border-radius: 20px;

    display: flex;
    align-items: center;
    padding: 0 1.4rem;

    label {
      display: flex;
      align-items: center;
    }

    svg {
      height: 1.6rem;
      width: 1.6rem;

      color: var(--gray-300);
    }

    input {
      background: transparent;
      border: none;
      height: 2.6rem;
      width: 10rem;
      outline: none;
      padding: 0 0.5rem;

      color: var(--white);
      font-size: 0.925rem;
    }
  }

  div {
    width: 2.6rem;
    height: 2.6rem;
    background-color: var(--white);
    border-radius: 50%;
    overflow: hidden;
    margin-left: 0.5rem;

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
