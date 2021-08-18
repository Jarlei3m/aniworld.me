import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Container } from './styles';

export function Hero() {
  return (
    <Container>
      <img
        src="https://c.wallhere.com/photos/4e/05/Elfen_Lied_Nyu-1351501.jpg!d"
        alt=""
      />
      <article>
        <h4>
          Season 1 • <span>2005</span>
        </h4>
        <h1>Elfen Lied</h1>
        <span className="stars">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
        </span>
        <p>
          Elfen Lied takes place in Kamakura and Kanagawa, and focuses on the
          "Diclonius", a newly mutated species. Their appearance is similar to
          humans, but with several differences, namely horn-like protrusions on
          the forehead and the presence of telekinetic invisible arms called
          "Vectors".
        </p>
        <button type="button">Watch</button>
      </article>
    </Container>
  );
}
