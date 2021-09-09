import { Hero } from '../Hero';
import { OnGoing } from '../OnGoing';
import { TrendingCarousel } from '../TrendingCarousel';
import { Container, Content } from './styles';

export function MainHome() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />
        <TrendingCarousel />
      </Content>
    </Container>
  );
}
