import Link from 'next/link';
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiFillCheckCircle,
} from 'react-icons/ai';
import { BiTrendingUp } from 'react-icons/bi';
import { RiCompassDiscoverFill } from 'react-icons/ri';
import { TiArrowRepeat } from 'react-icons/ti';
import { MdLocalMovies, MdSettings } from 'react-icons/md';
import { GiNinjaHeroicStance, GiExitDoor } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

import { NavbarContainer, NavMenuItem } from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function NavBar() {
  const currentMenu = useRouter();

  const { handleCredentialsLogout } = useContext(AuthContext);
  const [session] = useSession();

  function handleLogOut() {
    if (session) {
      // for signed social accounts
      signOut();
    } else {
      console.log('log out apart from session');
      // for email + pw signed accounts
      handleCredentialsLogout();
      // client.query(q.Logout(true));
    }
  }

  return (
    <NavbarContainer>
      <h1>aniworld.me</h1>

      <nav>
        <ul>
          <Link href="/">
            <NavMenuItem isActive={currentMenu.route === '/'}>
              <AiFillHome />
              <a>Home</a>
            </NavMenuItem>
          </Link>

          <Link href="/trending">
            <NavMenuItem isActive={currentMenu.route === '/trending'}>
              <BiTrendingUp />
              <a>Trending</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/discover'}>
              <RiCompassDiscoverFill />
              <a>Discover</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/recent'}>
              <AiFillHome />
              <a>Recent</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/anime-list'}>
              <AiOutlineUnorderedList />
              <a>Anime List</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/on-going'}>
              <TiArrowRepeat />
              <a>On Going</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/completed'}>
              <AiFillCheckCircle />
              <a>Completed</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/movies'}>
              <MdLocalMovies />
              <a>Movies</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/live-action'}>
              <GiNinjaHeroicStance />
              <a>Live Action</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem isActive={currentMenu.route === '/settings'}>
              <MdSettings />
              <a>Settings</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              onClick={() => handleLogOut()}
              isActive={currentMenu.route === '/log-out'}
            >
              <GiExitDoor />
              <a>Log Out</a>
            </NavMenuItem>
          </Link>
        </ul>
      </nav>
    </NavbarContainer>
  );
}
