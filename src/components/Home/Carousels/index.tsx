import { TrendingProvider } from '../../../contexts/TrendingContext';
import { AnimesTrending } from './AnimesTrending';
import { Hero } from './Hero';
import { MangasTrending } from './MangasTrending';
import { OnGoing } from './OnGoing';
import { Container, Content } from './styles';

export function Carousels() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />

        <TrendingProvider>
          <AnimesTrending />
          <MangasTrending />
        </TrendingProvider>
      </Content>
    </Container>
  );
}
