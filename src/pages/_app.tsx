import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { GlobalStyle } from '../styles/global';
import { LoginBgImage } from '../components/LoginBgImage';
import { LoginProvider } from '../contexts/LoginContext';
import { useRouter } from 'next/router';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextAuthProvider session={pageProps.session}>
      <AuthProvider>
        <LoginProvider>
          {router.asPath === '/login' ? (
            <LoginBgImage />
          ) : router.asPath === '/subscribe' ? (
            <LoginBgImage />
          ) : (
            <NavBar />
          )}
          <GlobalStyle />
          <Component {...pageProps} />
        </LoginProvider>
      </AuthProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
