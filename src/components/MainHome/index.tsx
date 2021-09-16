import { Hero } from '../Hero';
import { OnGoing } from '../OnGoing';
import { AnimesTrending } from '../Carousel/AnimesTrending';
import { MangasTrending } from '../Carousel/MangasTrending';
import { Container, Content } from './styles';

export function MainHome() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />
        <AnimesTrending />
        <MangasTrending />
      </Content>
    </Container>
  );
}
