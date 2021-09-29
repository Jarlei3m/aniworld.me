import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Carousels } from '../components/Home/Carousels';
import { Search } from '../components/Home/Search';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { SearchProvider } from '../contexts/SearchContext';
import { HomeContainer } from './styles';

export default function Home() {
  return (
    <>
      <Head>
        <title> Home | Stream.me</title>
      </Head>

      <HomeContainer>
        <Carousels />

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
