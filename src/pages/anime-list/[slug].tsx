import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { BsFillPlayFill, BsStarFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import {
  AnimeContainer,
  BannerImage,
  Description,
  EpisodesContainer,
  Title,
  TrailerContent,
  VoiceActorsContainer,
} from './slugStyles';

interface Episodes {
  site: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface EdgeProps {
  node: {
    id: number;
    name: {
      first: string;
      last?: string;
    };
  };
  voiceActors: {
    id: number;
    image: {
      large: string;
    };
    name: {
      first: string;
      last?: string;
    };
  };
}

interface AnimeProps {
  anime: {
    characters: {
      edges: EdgeProps[];
    };
    id: number;
    title: {
      english: string;
      romanji: string;
    };
    streamingEpisodes: Episodes[];
    trailer: {
      id: number;
      site: string;
      thumbnail: string;
    };
    bannerImage: string;
    seasonInt: number;
    seasonYear: number;
    averageScore: number;
    description: string;
    genres: Array<string>;
    coverImage: {
      extraLarge: string;
      color: string;
    };
    externalLinks?: {
      id: number;
      url: string;
      site: string;
    };
  };
}

export default function Anime({ anime }: AnimeProps) {
  const [isPlaying, setIsPlaying] = useState(0);

  console.log('Episodes:', anime.streamingEpisodes);

  return (
    <>
      <Head>
        <title> {anime.title?.english} | Aniworld.me </title>
      </Head>

      <AnimeContainer>
        <BannerImage
          src={anime.bannerImage || anime.coverImage.extraLarge}
          alt={anime.title.english}
        />
        <article>
          <div>
            <Title color={anime.coverImage.color}>{anime.title?.english}</Title>
            <p>
              <time>{anime.seasonYear}</time>
              <span>|</span>
              <span>
                <BsStarFill /> {(anime.averageScore / 10).toFixed(1)}
              </span>
              <span>|</span>
              <span>{anime.seasonInt} total episodes</span>
            </p>
          </div>

          {anime.trailer && (
            <TrailerContent>
              <ReactPlayer
                controls={true}
                width="498px"
                height="280px"
                onClickPreview={() => setIsPlaying(anime.id)}
                light={
                  isPlaying !== anime.id &&
                  `${anime.trailer.thumbnail || anime.coverImage.extraLarge}`
                }
                onEnded={() => setIsPlaying(0)}
                playIcon={<BsFillPlayFill />}
                playing={isPlaying === anime.id ? true : false}
                url={`https://www.youtube.com/watch?v=${anime.trailer?.id}`}
              />
            </TrailerContent>
          )}
        </article>

        <article>
          <Description
            dangerouslySetInnerHTML={{ __html: anime.description }}
          />
          <div>
            <VoiceActorsContainer>
              {anime.characters.edges.map((role) => {
                return (
                  <li key={role.node.id}>
                    <img src={role.voiceActors[0].image.large} alt="" />
                    <div>
                      <p>
                        Character:
                        <span>
                          {role.node.name.first} {role.node.name?.last}
                        </span>
                      </p>
                      <p>
                        Voice actor:
                        <span>
                          {role.voiceActors[0].name.first}{' '}
                          {role.voiceActors[0].name?.last}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </VoiceActorsContainer>
          </div>
        </article>

        <EpisodesContainer>
          <h2>Episodes</h2>
          <ul>
            {anime.streamingEpisodes.map((ep, index) => {
              return (
                <li key={ep.title}>
                  <ReactPlayer
                    controls={true}
                    width="352px"
                    height="280px"
                    onClickPreview={() => setIsPlaying(index + 1)}
                    light={isPlaying !== index + 1 && `${ep?.thumbnail}`}
                    onEnded={() => setIsPlaying(0)}
                    playIcon={<BsFillPlayFill />}
                    playing={isPlaying === index + 1 ? true : false}
                    url={ep.url}
                  />
                  <p>{ep.title}</p>
                </li>
              );
            })}
          </ul>
        </EpisodesContainer>
      </AnimeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // auth validation
  const session = await getSession({ req });
  const { ['aniworld.token']: token } = parseCookies({ req });

  if (!session && !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // anime requeted
  const { slug } = params;
  const animeTitle = slug.toString().replace(/[^\w\s]/gi, ' ');

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleError(data) {
    console.error('Error handleError:', data);
    // setIsSearchLoading(false);
  }

  function handleData({ data }) {
    const anime = data.Media;
    return anime;
  }

  // fetching data
  try {
    let query = `
    {
      Media(type: ANIME, search: "${animeTitle}") {
        characters(page: 1, role: MAIN, sort: RELEVANCE) {
          edges {
            node {
              id
              name {
                first
                last
              }      
            }
            voiceActors {
              id
              image {
                large
              }
              name {
                first
                last
              }
            }
          }
        }
        id
        title {
          english
          romaji
        }
        streamingEpisodes {
          site
          title
          thumbnail
          url
        }
        trailer {
          id
          site
          thumbnail
        }
        bannerImage
        seasonInt
        seasonYear
        averageScore
        description
        genres
        coverImage {
          extraLarge
          color
        }
        externalLinks {
          id
          url
          site
        }
      }
    }
    `;

    let API_URL = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      };

    // http request
    const anime = await fetch(API_URL, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    return {
      props: {
        anime,
      },
    };
  } catch (error) {
    console.log('Error Catch:', error);
  }
};
