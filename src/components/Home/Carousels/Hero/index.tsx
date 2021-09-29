import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Container } from './styles';

export function Hero() {
  return (
    <Container>
      <Carousel
        autoPlay={true}
        emulateTouch={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
      >
        <div>
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
              Elfen Lied takes place in Kamakura and Kanagawa, and focuses on
              the "Diclonius", a newly mutated species. Their appearance is
              similar to humans, but with several differences, namely horn-like
              protrusions on the forehead and the presence of telekinetic
              invisible arms called "Vectors".
            </p>
            <button type="button">Watch</button>
          </article>
        </div>

        <div>
          <img src="https://wallpaperaccess.com/full/2412896.jpg" alt="" />
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
              Elfen Lied takes place in Kamakura and Kanagawa, and focuses on
              the "Diclonius", a newly mutated species. Their appearance is
              similar to humans, but with several differences, namely horn-like
              protrusions on the forehead and the presence of telekinetic
              invisible arms called "Vectors".
            </p>
            <button type="button">Watch</button>
          </article>
        </div>

        <div>
          <img
            src="https://i.pinimg.com/originals/68/2b/13/682b1326d5d1b2c2e05ff2b63e22b3f6.jpg"
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
              Elfen Lied takes place in Kamakura and Kanagawa, and focuses on
              the "Diclonius", a newly mutated species. Their appearance is
              similar to humans, but with several differences, namely horn-like
              protrusions on the forehead and the presence of telekinetic
              invisible arms called "Vectors".
            </p>
            <button type="button">Watch</button>
          </article>
        </div>
        <div>
          <img
            src="https://preview.redd.it/lmfry5ppb2bx.png?width=960&crop=smart&auto=webp&s=19dd437cd9002a202c9711ff80702e67171ec56a"
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
              Elfen Lied takes place in Kamakura and Kanagawa, and focuses on
              the "Diclonius", a newly mutated species. Their appearance is
              similar to humans, but with several differences, namely horn-like
              protrusions on the forehead and the presence of telekinetic
              invisible arms called "Vectors".
            </p>
            <button type="button">Watch</button>
          </article>
        </div>
      </Carousel>
    </Container>
  );
}
