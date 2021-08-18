import { Hero } from '../Hero';
import { OnGoing } from '../OnGoing';
import { Container, Content } from './styles';

export function MainHome() {
  return (
    <Container>
      <Content>
        <Hero />
        <OnGoing />
      </Content>
    </Container>
  );
}
