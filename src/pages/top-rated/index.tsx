import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Header } from '../../components/TopRated/Header';
import { TopRatedList } from '../../components/TopRated/TopRatedList';
import { TopRatedProvider } from '../../contexts/TopRatedContext';
import { TopRatedContainer } from './styles';

export default function TopRated() {
  return (
    <TopRatedContainer>
      <Head>
        <title> Top Rated | Aniworld.me</title>
      </Head>

      <Header />
      <TopRatedProvider>
        <TopRatedList />
      </TopRatedProvider>
    </TopRatedContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const { ['aniworld.token']: token } = parseCookies({ req });

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
