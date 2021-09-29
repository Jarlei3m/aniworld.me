import styled from 'styled-components';

export const BgImageContainer = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  img {
    object-fit: cover;
    object-position: center;
    width: 100vw;
    height: 100vh;

    filter: brightness(0.7) grayscale(70%);
    -webkit-filter: brightness(0.7) grayscale(70%);
  }
`;
