import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

export function SearchBar() {
  return (
    <Container>
      <div>
        <label htmlFor="search">
          <FiSearch />
        </label>
        <input id="search" type="text" placeholder="Search..." />
      </div>

      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="name"
      />
    </Container>
  );
}
