import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <h1>Global trending topics</h1>

      <select>
        <option value="filter">Filter</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
      </select>
    </HeaderContainer>
  );
}
