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

export function Carousels() {
  const [sizeRef] = useSize();

  return (
    <Container>
      <Content ref={sizeRef}>
        <Hero />
        <OnGoing />

        <TopRatedProvider>
          <TopRatedAnimes />
          <TopRatedMangas />
        </TopRatedProvider>
        <TrendingProvider>
          <AnimesTrending />
          <MangasTrending />
        </TrendingProvider>
      </Content>
    </Container>
  );
}
