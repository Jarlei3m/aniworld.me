import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { CarouselTrendingProvider } from '../contexts/CarouselTrendingContext';
import { GlobalStyle } from '../styles/global';
import { PageContainer } from '../styles/Pages/styles';
import React from 'react';
import { TrendingProvider } from '../contexts/TrendingContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TrendingProvider>
      <CarouselTrendingProvider>
        <MostPopularProvider>
          <SearchProvider>
            <PageContainer>
              <NavBar />
              <GlobalStyle />
              <Component {...pageProps} />
            </PageContainer>
          </SearchProvider>
        </MostPopularProvider>
      </CarouselTrendingProvider>
    </TrendingProvider>
  );
}

export default MyApp;
