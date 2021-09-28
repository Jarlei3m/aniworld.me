import Head from 'next/head';
import { RightSide } from '../components/RightSide';
import { MainHome } from '../components/MainHome';
import { SearchProvider } from '../contexts/SearchContext';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { getSession, useSession } from 'next-auth/client';

import { HomeContainer } from '../styles/Pages/Home/styles';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

// function Redirect({ to }) {
//   const router = useRouter();

//   useEffect(() => {
//     router.push(to);
//   }, [to]);

//   return null;
// }

export default function Home() {
  const [session] = useSession();
  const { isAuthenticated } = useContext(AuthContext);

  // check if user is logged in
  // if (!session || !isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <>
      <Head>
        <title> Home | Stream.me</title>
      </Head>

      <HomeContainer>
        <MainHome />

        <MostPopularProvider>
          <SearchProvider>
            <RightSide />
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
