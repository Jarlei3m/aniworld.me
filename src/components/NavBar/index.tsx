import { NavbarContainer } from './styles';
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
            <a href="#">Home</a>
          </li>
          <li>
            <BiTrendingUp />
            <a href="#">Trending</a>
          </li>
          <li>
            <RiCompassDiscoverFill />
            <a href="#">Discover</a>
          </li>
        </ul>

        <ul>
          <li>
            <AiFillHome />
            <a href="#">Recent</a>
          </li>
          <li>
            <AiOutlineUnorderedList />
            <a href="#">Anime List</a>
          </li>
        </ul>

        <ul>
          <li>
            <TiArrowRepeat />
            <a href="#">On Going</a>
          </li>
          <li>
            <AiFillCheckCircle />
            <a href="#">Completed</a>
          </li>
          <li>
            <MdLocalMovies />
            <a href="#">Movies</a>
          </li>
          <li>
            <GiNinjaHeroicStance />
            <a href="#">Live Action</a>
          </li>
        </ul>

        <ul>
          <li>
            <MdSettings />
            <a href="#">Settings</a>
          </li>
          <li>
            <GiExitDoor />
            <a href="#">Log Out</a>
          </li>
        </ul>
      </nav>
    </NavbarContainer>
  );
}
