import Head from 'next/head';
import { Header } from '../components/TrendingPage/Header';
import { TrendingList } from '../components/TrendingPage/TrendingList';
import { TrendingProvider } from '../contexts/TrendingContext';

import { TrendingContainer } from '../styles/Pages/Trending/styles';

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
