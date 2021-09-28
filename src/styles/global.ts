import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

    --red-500: #cc5662;
  }

  #__next {
    display: flex;
  }

  html {
    scroll-behavior: smooth;

    @media(max-width: 1080px) {
    font-size: 93.75%;
    }

    @media(max-width: 720px) {
    font-size: 87.5%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
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

  .Toastify__toast {
    position: absolute;
    right: 0;
  }

  .Toastify__toast.Toastify__toast--error {
    background: var(--red-500);
    color: var(--white);
    width: 16rem;
  }

  .Toastify__toast.Toastify__toast--success {
    background: var(--gray-500);
    color: var(--white);
    width: 20rem;
    height: 6rem;
  }

  .Toastify__progress-bar--success {
    background: var(--green-500);
    border-top-right-radius: 4px; 
    height: 4px;
  }
  .Toastify__progress-bar--error {
    background: var(--white);
    border-top-right-radius: 4px; 
    height: 4px;
  }

`;
