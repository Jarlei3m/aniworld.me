import { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

import axios from 'axios';
import { SearchContext } from '../../contexts/SearchContext';
import { useEffect } from 'react';

export function SearchBar() {
  const { fetchAnimeOnSearch } = useContext(SearchContext);
  const [animeTitle, setAnimeTitle] = useState('');

  useEffect(() => {
    fetchAnimeOnSearch(animeTitle);
  }, [animeTitle]);

  return (
    <Container>
      <form>
        <label htmlFor="search">
          <FiSearch />
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={animeTitle}
          onChange={(e) => setAnimeTitle(e.target.value)}
        />
      </form>

      <img
        src="https://xesque.rocketseat.dev/users/avatar/profile-029ff02b-a8cb-4868-aafc-8556229c6c9f-1616845350093.jpg"
        alt="name"
      />
    </Container>
  );
}
