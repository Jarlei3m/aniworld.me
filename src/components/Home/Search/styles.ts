import styled from 'styled-components';

export const Container = styled.aside`
  padding: 3rem 1rem;
  width: 100%;
  max-width: 22rem;

  border-left: 2px solid var(--gray-100);

  @media (max-width: 1440px) {
    max-width: 19rem;
  }

  @media (max-width: 1024px) {
    max-width: 16rem;
  }

  @media (max-width: 768px) {
    max-width: 14rem;
    padding: 3.5rem 0.5rem;
  }
`;

export const Content = styled.div`
  height: 100%;
`;
