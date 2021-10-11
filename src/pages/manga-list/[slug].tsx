import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { BsFillPlayFill, BsStarFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import {
  BannerImage,
  CharContainer,
  Description,
  ExtraInfos,
  MangaContainer,
  StaffContainer,
  Title,
  TrailerContent,
} from './slugStyles';

interface CharEdgeProps {
  node: {
    id: number;
    name: {
      first: string;
      last?: string;
    };
    image: {
      large: string;
    };
  };
}

interface StaffEdgeProps {
  node: {
    id: number;
    name: {
      first: string;
      last?: string;
    };
    age: number;
    homeTown: string;
    image: {
      large: string;
    };
  };
}

interface MangaProps {
  manga: {
    characters: {
      edges: CharEdgeProps[];
    };
    staff: {
      edges: StaffEdgeProps[];
    };
    id: number;
    title: {
      english?: string;
      romanji?: string;
    };
    trailer?: {
      id: number;
      thumbnail?: string;
    };
    bannerImage?: string;
    startDate: {
      year: number;
    };
    chapters: string;
    volumes: string;
    averageScore: number;
    description: string;
    genres: Array<string>;
    coverImage?: {
      extraLarge?: string;
      color?: string;
    };
    externalLinks?: {
      id: number;
      url: string;
    };
  };
}

export default function Anime({ manga }: MangaProps) {
  const [isPlaying, setIsPlaying] = useState(0);

  console.log('SCORE:', manga.averageScore);
  return (
    <>
      <Head>
        <title>
          {manga.title?.english || manga.title?.romanji} | Aniworld.me
        </title>
      </Head>

      <MangaContainer>
        <BannerImage
          src={manga?.bannerImage || manga.coverImage?.extraLarge}
          alt={manga.title?.english || manga.title?.romanji}
        />
        <article>
          <div>
            <Title color={manga.coverImage?.color}>
              {manga.title?.english}
            </Title>
            <p>
              <time>{manga.startDate.year}</time>
              <span>|</span>
              <span>
                <BsStarFill /> {(manga.averageScore / 10).toFixed(1)}
              </span>
              {manga.volumes && (
                <>
                  <span>|</span>
                  <span>{manga.volumes} total volumes</span>
                </>
              )}
            </p>
            <u>
              {manga.genres.map((genre) => {
                return <span>{genre}</span>;
              })}
            </u>
          </div>

          {manga?.trailer && (
            <TrailerContent>
              <ReactPlayer
                controls={true}
                width="498px"
                height="280px"
                onClickPreview={() => setIsPlaying(manga.id)}
                light={
                  isPlaying !== manga.id &&
                  `${manga.trailer?.thumbnail || manga.coverImage?.extraLarge}`
                }
                onEnded={() => setIsPlaying(0)}
                playIcon={<BsFillPlayFill />}
                playing={isPlaying === manga.id ? true : false}
                url={`https://www.youtube.com/watch?v=${manga.trailer?.id}`}
              />
            </TrailerContent>
          )}
        </article>

        <article>
          <Description
            dangerouslySetInnerHTML={{ __html: manga.description }}
          />
          <ExtraInfos>
            <StaffContainer>
              {manga.staff.edges.map((char) => {
                return (
                  <li key={char.node.id}>
                    <img src={char.node.image.large} alt="" />
                    <div>
                      <p>
                        Author:
                        <span>
                          {char.node.name.first} {char.node.name?.last}
                        </span>
                      </p>
                      {char.node.age && (
                        <p>
                          Age:
                          <span>{char.node.age}</span>
                        </p>
                      )}
                      {char.node.homeTown && (
                        <p>
                          Home town:
                          <span>{char.node.homeTown}</span>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </StaffContainer>

            <CharContainer>
              {manga.characters.edges.map((char) => {
                return (
                  <li key={char.node.id}>
                    <img
                      src={char.node.image.large}
                      alt={char.node.name.first}
                    />
                    <p>
                      {char.node.name.first} {char.node.name?.last}
                    </p>
                  </li>
                );
              })}
            </CharContainer>
          </ExtraInfos>
        </article>
      </MangaContainer>
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

  // manga requeted
  const { slug } = params;
  const mangaTitle = slug.toString().replace(/[^\w\s]/gi, ' ');

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleError(data) {
    console.error('Error:', data);
  }

  function handleData({ data }) {
    const response = data.Media;
    return response;
  }

  // fetching data
  try {
    let query = `
    {
      Media(type: MANGA, search: "${mangaTitle}") {
        characters(page: 1, role: MAIN, sort: RELEVANCE) {
          edges {
            node {
              id
              name {
                first
                last
              }
              image {
                large
              }      
            }            
          }
        }
        staff(page: 1, perPage: 1, sort: RELEVANCE) {
          edges {
            node {
              id
              name {
                first
                last
              }      
              age
              homeTown
              image {
                large
              }
            }            
          }
        }
        id
        title {
          english
          romaji
        }
        trailer {
          id
          thumbnail
        }
        bannerImage
        startDate {
          year
        }
        chapters
        volumes
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
    const manga = await fetch(API_URL, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    return {
      props: {
        manga,
      },
    };
  } catch (error) {
    console.log('Error Catch:', error);
  }
};
