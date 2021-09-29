import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Header } from '../../components/Trending/Header';
import { TrendingList } from '../../components/Trending/TrendingList';
import { TrendingProvider } from '../../contexts/TrendingContext';

import { TrendingContainer } from './styles';

export default function Trending() {
  return (
    <TrendingContainer>
      <Head>
        <title> Trending | Stream.me</title>
      </Head>

      <Header />
      <TrendingProvider>
        <TrendingList />
      </TrendingProvider>
    </TrendingContainer>
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
