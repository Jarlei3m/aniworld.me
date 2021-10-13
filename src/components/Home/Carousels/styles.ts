import styled from 'styled-components';

export const Container = styled.section`
  max-width: calc(100vw - 20rem - 17rem - 2.4rem);
  width: 100%;
  margin: 0 1.2rem;

  @media (min-width: 2500px) {
    max-width: calc(100vw - 20rem - 16rem - 2.4rem);
  }

  @media (max-width: 1440px) {
    max-width: calc(100vw - 14rem - 19rem - 2.4rem);
  }

  @media (max-width: 1024px) {
    max-width: calc(100vw - 12rem - 16rem - 2.4rem);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 10rem - 14rem - 2.4rem);
  }
`;

export const Content = styled.div`
  margin-top: 3rem;
`;
