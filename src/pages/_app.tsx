import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { GlobalStyle } from '../styles/global';
import { PageContainer } from '../styles/Pages/styles';
import React from 'react';
import { TrendingProvider } from '../contexts/TrendingContext';
import { useRouter } from 'next/dist/client/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log('router:', router);

  return (
    <TrendingProvider>
      <MostPopularProvider>
        <SearchProvider>
          <PageContainer>
            {router.asPath !== '/login' && <NavBar />}
            <GlobalStyle />
            <Component {...pageProps} />
          </PageContainer>
        </SearchProvider>
      </MostPopularProvider>
    </TrendingProvider>
  );
}

export default MyApp;
