import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { TrendingProvider } from '../contexts/TrendingContext';
import { GlobalStyle } from '../styles/global';
import { PageContainer } from '../styles/Pages/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TrendingProvider>
      <MostPopularProvider>
        <SearchProvider>
          <PageContainer>
            <NavBar />
            <GlobalStyle />
            <Component {...pageProps} />
          </PageContainer>
        </SearchProvider>
      </MostPopularProvider>
    </TrendingProvider>
  );
}

export default MyApp;
