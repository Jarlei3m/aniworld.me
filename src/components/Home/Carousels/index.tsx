import { TrendingProvider } from '../../../contexts/TrendingContext';
import useSize from '../../../hooks/useSize';
import { AnimesTrending } from './AnimesTrending';
import { Hero } from './Hero';
import { MangasTrending } from './MangasTrending';
import { TopRatedAnimes } from './TopRatedAnimes';
import { OnGoing } from './OnGoing';
import { Container, Content } from './styles';
import { TopRatedProvider } from '../../../contexts/TopRatedContext';
import { TopRatedMangas } from './TopRatedMangas';
import { RecentAnimes } from './RecentAnimes';
import React from 'react';
import { RecentProvider } from '../../../contexts/RecentContext';

export function Carousels() {
  const [sizeRef] = useSize();

  return (
    <Container>
      <Content ref={sizeRef}>
        <RecentProvider>
          <TopRatedProvider>
            <TrendingProvider>
              <Hero />
              <OnGoing />

              <RecentAnimes />
              <MangasTrending />

              <TopRatedAnimes />
              <AnimesTrending />
              <TopRatedMangas />
            </TrendingProvider>
          </TopRatedProvider>
        </RecentProvider>
      </Content>
    </Container>
  );
}
