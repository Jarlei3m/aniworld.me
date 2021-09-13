import { Hero } from '../Hero';
import { OnGoing } from '../OnGoing';
import { AnimesOnTrendingCarousel } from '../AnimesOnTrendingCarousel';
import { Container, Content } from './styles';
import { MangasOnTrendingCarousel } from '../MangasOnTrendingCarousel';

export function MainHome() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />
        <AnimesOnTrendingCarousel />
        <MangasOnTrendingCarousel />
      </Content>
    </Container>
  );
}
