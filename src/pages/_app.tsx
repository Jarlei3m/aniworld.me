import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { GlobalStyle } from '../styles/global';
import { LoginBgImage } from '../components/LoginBgImage';
import { LoginProvider } from '../contexts/LoginContext';
import { useRouter } from 'next/router';
import { Provider as NextAuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextAuthProvider session={pageProps.session}>
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
    </NextAuthProvider>
  );
}

export default MyApp;
