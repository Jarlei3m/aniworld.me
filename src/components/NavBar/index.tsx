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
            <Link href="#">Home</Link>
          </li>
          <li>
            <BiTrendingUp />
            <Link href="#trending">Trending</Link>
          </li>
          <li>
            <RiCompassDiscoverFill />
            <Link href="#">Discover</Link>
          </li>
        </ul>

        <ul>
          <li>
            <AiFillHome />
            <Link href="#">Recent</Link>
          </li>
          <li>
            <AiOutlineUnorderedList />
            <Link href="#">Anime List</Link>
          </li>
        </ul>

        <ul>
          <li>
            <TiArrowRepeat />
            <Link href="#">On Going</Link>
          </li>
          <li>
            <AiFillCheckCircle />
            <Link href="#">Completed</Link>
          </li>
          <li>
            <MdLocalMovies />
            <Link href="#">Movies</Link>
          </li>
          <li>
            <GiNinjaHeroicStance />
            <Link href="#">Live Action</Link>
          </li>
        </ul>

        <ul>
          <li>
            <MdSettings />
            <Link href="#">Settings</Link>
          </li>
          <li>
            <GiExitDoor />
            <Link href="#">Log Out</Link>
          </li>
        </ul>
      </nav>
    </NavbarContainer>
  );
}
