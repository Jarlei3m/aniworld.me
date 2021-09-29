import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-100);
  padding-bottom: 1rem;

  h1 {
    font-size: 1.4rem;
    /* line-height: 4rem; */
    color: var(--gray-300);
  }

  select {
    text-align: center;
    border: none;
    background: var(--gray-500);
    width: 7rem;
    height: 3rem;
    color: var(--white);
    border-radius: 6px;
    cursor: pointer;
    transition: filter 0.2s;
    padding: 0.5rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
