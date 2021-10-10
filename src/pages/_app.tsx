import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NavBar } from '../components/NavBar';
import { AuthProvider } from '../contexts/AuthPages/AuthContext';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextAuthProvider session={pageProps.session}>
      <AuthProvider>
        <MostPopularProvider>
          <SearchProvider>
            <NavBar />
            <GlobalStyle />
            <Component {...pageProps} />
          </SearchProvider>
        </MostPopularProvider>
      </AuthProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
