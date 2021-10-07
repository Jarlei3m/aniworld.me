import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React from 'react';
import { Carousels } from '../components/Home/Carousels';
import { Search } from '../components/Home/Search';
import { CarouselSlideProvider } from '../contexts/CarouselSlide/CarouselSlideContext';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { HomeContainer } from './styles';

export default function Home() {
  return (
    <>
      <Head>
        <title> Home | Aniworld.me</title>
      </Head>

      <HomeContainer>
        <CarouselSlideProvider>
          <Carousels />
        </CarouselSlideProvider>

        <MostPopularProvider>
          <SearchProvider>
            <Search />
          </SearchProvider>
        </MostPopularProvider>
      </HomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { ['aniworld.token']: token } = parseCookies(ctx);

  if (!token && !session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
