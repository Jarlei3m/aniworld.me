import { Hero } from '../Hero';
import { OnGoing } from '../OnGoing';
import { Trending } from '../Trending';
import { Container, Content } from './styles';

export function MainHome() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />
        <Trending />
      </Content>
    </Container>
  );
}
