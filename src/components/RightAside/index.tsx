import { MostPopular } from '../MostPopular';
import { SearchBar } from '../SearchBar';
import { Container, Content } from './styles';

export function RightAside() {
  return (
    <Container>
      <Content>
        <SearchBar />
        <MostPopular />
      </Content>
    </Container>
  );
}
