import styled from 'styled-components';

export const Container = styled.section`
  max-width: calc(100vw - 16rem - 20rem - 2.4rem);
  width: 100%;
  margin: 0 1.2rem;

  @media (max-width: 1024px) {
    max-width: calc(100vw - 8rem - 8rem - 2.4rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 2rem - 2rem - 2.4rem);
  }
`;

export const Content = styled.div`
  margin-top: 3rem;
`;
