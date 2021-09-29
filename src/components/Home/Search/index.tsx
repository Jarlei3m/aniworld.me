import { MostPopular } from './MostPopular';
import { SearchBar } from './SearchBar';
import { Container, Content } from './styles';

export function Search() {
  return (
    <Container>
      <Content>
        <SearchBar />
        <MostPopular />
      </Content>
    </Container>
  );
}
