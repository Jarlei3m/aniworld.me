import { AppProps } from 'next/app';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MostPopularProvider>
      <SearchProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </SearchProvider>
    </MostPopularProvider>
  );
}

export default MyApp;
