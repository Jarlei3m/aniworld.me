import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';

export default function AnimeList() {
  return <h1>Anime List Page</h1>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  return {
    props: {},
  };
};
