import { NavbarContainer, NavMenuItem } from './styles';
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
import { useState } from 'react';

export function NavBar() {
  const [currentMenu, setCurrentMenu] = useState('Home');

  function handleCurrentMenu(navMenu: string) {
    if (navMenu !== currentMenu) {
      setCurrentMenu(navMenu);
    }
  }

  return (
    <NavbarContainer>
      <h1>stream.me</h1>

      <nav>
        <ul>
          <Link href="/">
            <NavMenuItem
              isActive={currentMenu === 'Home'}
              onClick={() => handleCurrentMenu('Home')}
            >
              <AiFillHome />
              <a>Home</a>
            </NavMenuItem>
          </Link>

          <Link href="/trending">
            <NavMenuItem
              isActive={currentMenu === 'Trending'}
              onClick={() => handleCurrentMenu('Trending')}
            >
              <BiTrendingUp />
              <a>Trending</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Discover'}
              onClick={() => handleCurrentMenu('Discover')}
            >
              <RiCompassDiscoverFill />
              <a>Discover</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Recent'}
              onClick={() => handleCurrentMenu('Recent')}
            >
              <AiFillHome />
              <a>Recent</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Anime List'}
              onClick={() => handleCurrentMenu('Anime List')}
            >
              <AiOutlineUnorderedList />
              <a>Anime List</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'On Going'}
              onClick={() => handleCurrentMenu('On Going')}
            >
              <TiArrowRepeat />
              <a>On Going</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Completed'}
              onClick={() => handleCurrentMenu('Completed')}
            >
              <AiFillCheckCircle />
              <a>Completed</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Movies'}
              onClick={() => handleCurrentMenu('Movies')}
            >
              <MdLocalMovies />
              <a>Movies</a>
            </NavMenuItem>
          </Link>

          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Live Action'}
              onClick={() => handleCurrentMenu('Live Action')}
            >
              <GiNinjaHeroicStance />
              <a>Live Action</a>
            </NavMenuItem>
          </Link>
        </ul>

        <ul>
          <Link href="#">
            <NavMenuItem
              isActive={currentMenu === 'Settings'}
              onClick={() => handleCurrentMenu('Settings')}
            >
              <MdSettings />
              <a>Settings</a>
            </NavMenuItem>
          </Link>

          <Link href="/login">
            <NavMenuItem
              isActive={currentMenu === 'Log out'}
              onClick={() => handleCurrentMenu('Log out')}
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
