import { NavbarContainer } from './styles';
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

export function NavBar() {
  return (
    <NavbarContainer>
      <h1>stream.me</h1>

      <nav>
        <ul>
          <li className="active">
            <AiFillHome />
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <BiTrendingUp />
            <Link href="/trending">
              <a>Trending</a>
            </Link>
          </li>
          <li>
            <RiCompassDiscoverFill />
            <Link href="#">
              <a>Discover</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <AiFillHome />
            <Link href="#">
              <a>Recent</a>
            </Link>
          </li>
          <li>
            <AiOutlineUnorderedList />
            <Link href="#">
              <a>Anime List</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <TiArrowRepeat />
            <Link href="#">
              <a>On Going</a>
            </Link>
          </li>
          <li>
            <AiFillCheckCircle />
            <Link href="#">
              <a>Completed</a>
            </Link>
          </li>
          <li>
            <MdLocalMovies />
            <Link href="#">
              <a>Movies</a>
            </Link>
          </li>
          <li>
            <GiNinjaHeroicStance />
            <Link href="#">
              <a>Live Action</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <MdSettings />
            <Link href="#">
              <a>Settings</a>
            </Link>
          </li>
          <li>
            <GiExitDoor />
            <Link href="#">
              <a>Log Out</a>
            </Link>
          </li>
        </ul>
      </nav>
    </NavbarContainer>
  );
}
