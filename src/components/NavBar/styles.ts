import styled from 'styled-components';

export const NavbarContainer = styled.aside`
  padding: 3rem 0;
  width: 100%;
  max-width: 15rem;
  border-right: 2px solid var(--gray-100);

  @media (max-width: 1440px) {
    max-width: 14rem;
  }

  @media (max-width: 1024px) {
    max-width: 12rem;
  }

  @media (max-width: 768px) {
    max-width: 10rem;
  }

  h1 {
    width: 100%;
    color: var(--green-500);
    font-size: 1.8rem;
    text-align: left;
    padding-left: 2.3rem;

    @media (max-width: 1440px) {
      font-size: 1.5rem;
    }

    @media (max-width: 1024px) {
      font-size: 1.375rem;
      padding-left: 1.875rem;
    }

    @media (max-width: 768px) {
      font-size: 1.25rem;
      padding-left: 1.5rem;
    }
  }

  nav {
    margin-top: 3rem;
    width: 100%;

    @media (max-width: 768px) {
      margin-top: 2rem;
    }

    ul {
      padding-left: 2.3rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--gray-100);

      @media (max-width: 1024px) {
        padding-left: 1.875rem;
      }

      @media (max-width: 768px) {
        padding-left: 1.5rem;
      }

      &:last-child {
        border-bottom: none;
      }

      & + ul {
        margin-top: 1.5rem;

        @media (max-width: 1024px) {
          margin-top: 1.375rem;
        }
      }
    }
  }
`;

interface NavMenuItemProps {
  isActive: boolean;
}

export const NavMenuItem = styled.li<NavMenuItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--gray-300);
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;

  @media (max-width: 1024px) {
    font-size: 0.8125rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

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

    @media (max-width: 768px) {
      margin-top: 1.75rem;
    }
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
