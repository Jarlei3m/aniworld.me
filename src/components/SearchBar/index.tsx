import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useSession } from 'next-auth/client';
import { FiSearch } from 'react-icons/fi';
import no_avatar from '../../../public/assets/no_avatar.png';
import Image from 'next/image';

import { Container } from './styles';

export function SearchBar() {
  const { fetchAnimeOnSearch } = useContext(SearchContext);
  const [animeTitle, setAnimeTitle] = useState('');

  useEffect(() => {
    fetchAnimeOnSearch(animeTitle);
  }, [animeTitle]);

  // session data when social login
  const [session] = useSession();

  // new access data by email and pw login
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <form>
        <label htmlFor="search">
          <FiSearch />
        </label>
        <input
          id="search"
          type="text"
          autoComplete="off"
          placeholder="Search..."
          value={animeTitle}
          onChange={(e) => setAnimeTitle(e.target.value)}
        />
      </form>

      <div>
        {session?.user.image || user?.image ? (
          // <img alt="" src={session?.user.image || user?.image} />
          <Image
            src={session?.user.image || user?.image}
            alt={`${session?.user.name || user?.name}'s avatar picture`}
            width={41.6}
            height={41.6}
            quality={100}
          />
        ) : (
          <Image
            src={no_avatar}
            alt={`${session?.user.name || user?.name}'s avatar picture`}
            placeholder="blur"
            quality={100}
          />
        )}
      </div>
    </Container>
  );
}
