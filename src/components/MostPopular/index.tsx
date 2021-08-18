import { Container } from './styles';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export function MostPopular() {
  return (
    <Container>
      <h1>Popular This Week</h1>

      <ul>
        <li>
          <img
            src="https://br.web.img3.acsta.net/pictures/16/02/03/17/11/571106.jpg"
            alt=""
          />
          <article>
            <div>
              <h4>One Piece</h4>
              <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
            </div>
            <span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </span>
          </article>
        </li>

        <li>
          <img
            src="https://image.api.playstation.com/cdn/UP4108/CUSA08956_00/EsdKIgxYrK4Bbs5O1pNO3zT5xJ0pL8Gk.png"
            alt=""
          />
          <article>
            <div>
              <h4>Attack On Titan</h4>
              <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
            </div>
            <span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStar />
            </span>
          </article>
        </li>

        <li>
          <img src="https://pbs.twimg.com/media/EVuqwnWWkAAg-q8.jpg" alt="" />
          <article>
            <div>
              <h4>Berserk</h4>
              <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
            </div>
            <span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </span>
          </article>
        </li>

        <li>
          <img
            src="https://i2.wp.com/manualdosgames.com/wp-content/uploads/2021/08/Demon-Slayer-Kimetsu-no-Yaiba-The-Movie-Mugen-Train-1170x780.jpg"
            alt=""
          />
          <article>
            <div>
              <h4>Demon Slayer</h4>
              <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
            </div>
            <span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </span>
          </article>
        </li>

        <li>
          <img
            src="https://br.web.img3.acsta.net/pictures/16/02/03/17/11/571106.jpg"
            alt=""
          />
          <article>
            <div>
              <h4>One Piece</h4>
              <p>Action, Adventure, Comedy, Drama, Fantasy, Shounen</p>
            </div>
            <span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </span>
          </article>
        </li>
      </ul>

      <button type="button">See More</button>
    </Container>
  );
}
