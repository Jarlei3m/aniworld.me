import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
    width: 100vw;
    height: 100vh;

    filter: brightness(0.7) grayscale(70%);
    -webkit-filter: brightness(0.7) grayscale(70%);
  }
`;
