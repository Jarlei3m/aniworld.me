import { Header } from '../components/TrendingPage/Header';
import { TrendingList } from '../components/TrendingPage/TrendingList';
import { TrendingContainer } from '../styles/Pages/Trending/styles';

export default function Trending() {
  return (
    <TrendingContainer>
      <Header />
      <TrendingList />
    </TrendingContainer>
  );
}
