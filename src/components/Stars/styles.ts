import styled from 'styled-components';

export const Container = styled.div`
  span {
    & + span {
      margin-left: 0.375rem;
    }
    svg {
      color: var(--yellow-500);
      height: 1.125rem;
      width: 1.125rem;

      @media (max-width: 1440px) {
        height: 1rem;
        width: 1rem;
      }

      @media (max-width: 1440px) {
        height: 0.875rem;
        width: 0.875rem;
      }
    }
  }
`;
