import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #__next {
    /* display: flex; */
    /* justify-content: space-between; */
  }

    :root {
    --white: #FFFFFF;

    --gray-100: #60606634;
    --gray-300: #a8a8b3;
    --gray-500: #3D3C42;
    --gray-850: #1f2425;
    --gray-900: #121214;

    --green-300: #88c2a2;
    --green-500: #84f8b8;

    --yellow-500: #f3ef0b;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--gray-850);
    color: var(--white);
  }

  body, input, textarea, select, button {
    font: 400 1rem 'Roboto', sans-serif;
  }

  button { 
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style: none;
  }
`;
