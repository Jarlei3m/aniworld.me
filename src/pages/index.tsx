import Head from 'next/head';
import { RightSide } from '../components/RightSide';
import { MainHome } from '../components/MainHome';
import { SearchProvider } from '../contexts/SearchContext';
import { MostPopularProvider } from '../contexts/MostPopularContext';

import { HomeContainer } from '../styles/Pages/Home/styles';

export default function Home() {
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
