import { TrendingProvider } from '../../../contexts/TrendingContext';
import useSize from '../../../hooks/useSize';
import { AnimesTrending } from './AnimesTrending';
import { Hero } from './Hero';
import { MangasTrending } from './MangasTrending';
import { OnGoing } from './OnGoing';
import { Container, Content } from './styles';

export function Carousels() {
  const [sizeRef] = useSize();

  return (
    <Container>
      <Content ref={sizeRef}>
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
