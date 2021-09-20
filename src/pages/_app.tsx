import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { GlobalStyle } from '../styles/global';
import { LoginBgImage } from '../components/LoginBgImage';
import { LoginProvider } from '../contexts/LoginContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <LoginProvider>
      {router.asPath === '/login' ? (
        <LoginBgImage />
      ) : router.asPath === '/register' ? (
        <LoginBgImage />
      ) : (
        <NavBar />
      )}
      <GlobalStyle />
      <Component {...pageProps} />
    </LoginProvider>
  );
}

export default MyApp;
