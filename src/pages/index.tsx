import Head from 'next/head';
import { RightSide } from '../components/RightSide';
import { MainHome } from '../components/MainHome';
import { SearchProvider } from '../contexts/SearchContext';
import { MostPopularProvider } from '../contexts/MostPopularContext';
import { useSession } from 'next-auth/client';

import { HomeContainer } from '../styles/Pages/Home/styles';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fauna } from '../services/fauna';
import { query as q } from 'faunadb';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

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
