import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { useSession } from 'next-auth/client';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

export function SearchBar() {
  const { fetchAnimeOnSearch } = useContext(SearchContext);
  const [animeTitle, setAnimeTitle] = useState('');

  useEffect(() => {
    fetchAnimeOnSearch(animeTitle);
  }, [animeTitle]);

  // session data
  const [session] = useSession();

  console.log('session:', session);

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
        title={`${session?.user.name}'s Picture`}
        src={session?.user.image}
        alt={`${session?.user.name}'s Picture`}
      />
    </Container>
  );
}
