import { useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import { Container } from './styles';
import { BsFillPlayFill } from 'react-icons/bs';
import { TrendingContext } from '../../contexts/TrendingContext';
import { ReactEventHandler } from 'react';

export function Trending() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { trendingAnimes } = useContext(TrendingContext);

  // function handleOnMouseHover(e) {
  //   console.log(e.target.value);
  //   setIsPlaying(true);
  //   setIsMuted(false);
  // }

  function handleOnMouseLeave() {
    setIsPlaying(false);
    setIsMuted(true);
  }

  console.log('trending animes:', trendingAnimes);

  return (
    <Container>
      <h2>Trending</h2>

      <section>
        {trendingAnimes.map((anime) => {
          const { id, title, trailer, description, coverImage } = anime;
          return (
            <div key={id}>
              <ReactPlayer
                controls={true}
                // onMouseEnter={() => handleOnMouseHover()}
                // onMouseLeave={() => handleOnMouseLeave()}
                onClickPreview={() => setIsPlaying(true)}
                light={!isPlaying && `${coverImage.extraLarge}`}
                playIcon={<BsFillPlayFill />}
                playing={isPlaying}
                // muted={false}
                url={
                  trailer
                    ? `https://www.youtube.com/watch?v=${trailer?.id}`
                    : null
                }
              />

              <h4>{title.english ? title.english : title.romanji}</h4>
              <span>Trailer</span>
            </div>
          );
        })}
      </section>
    </Container>
  );
}
