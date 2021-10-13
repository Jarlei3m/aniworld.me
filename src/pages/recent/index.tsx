import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Header } from '../../components/Recent/Header';
import { RecentList } from '../../components/Recent/RecentList';
import { RecentProvider } from '../../contexts/RecentContext';

import { RecentContainer } from './styles';

export default function Recent() {
  return (
    <RecentContainer>
      <Head>
        <title> Recent | Aniworld.me</title>
      </Head>

      <Header />
      <RecentProvider>
        <RecentList />
      </RecentProvider>
    </RecentContainer>
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
