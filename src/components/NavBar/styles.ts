import styled from 'styled-components';

export const NavbarContainer = styled.aside`
  padding: 3.5rem 0;
  width: 100%;
  max-width: 16rem;
  border-right: 2px solid var(--gray-100);

  h1 {
    color: var(--green-500);
    font-size: 1.8rem;
    padding: 0 2.3rem;
  }

  nav {
    margin-top: 3rem;
    width: 100%;

    ul {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--gray-100);

      &:last-child {
        border-bottom: none;
      }

      & + ul {
        margin-top: 1.5rem;
      }
    }
  }
`;

interface NavMenuItemProps {
  isActive: boolean;
}

export const NavMenuItem = styled.li<NavMenuItemProps>`
  padding-left: 2.3rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  position: relative;
  cursor: pointer;
  color: var(--gray-300);

  ${(props) =>
    props.isActive &&
    `color: #84f8b8;
    &::after {
      content: '';
      height: 100%;
      width: 3px;
      border-radius: 2px 0 0 2px;
      position: absolute;
      right: -1px;
      background: #84f8b8;
    }
  `};

  svg {
    width: 1rem;
  }

  & + li {
    margin-top: 2rem;
  }

  a {
    margin-left: 0.8rem;
  }

  &:hover {
    color: var(--green-500);
  }

  /* &.active {
    color: var(--green-500);

    &::after {
      content: '';
      height: 100%;
      width: 3px;
      border-radius: 2px 0 0 2px;
      position: absolute;
      right: -1px;
      background: var(--green-500);
    }
  } */
`;
