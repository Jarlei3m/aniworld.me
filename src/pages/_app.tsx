import { AppProps } from 'next/app';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { TrendingProvider } from '../contexts/TrendingContext';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TrendingProvider>
      <MostPopularProvider>
        <SearchProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </SearchProvider>
      </MostPopularProvider>
    </TrendingProvider>
  );
}

export default MyApp;
