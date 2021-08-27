import styled from 'styled-components';

export const Container = styled.div`
  span {
    & + span {
      margin-left: 0.4rem;
    }
    svg {
      color: var(--yellow-500);
      height: 1.1rem;
      width: 1.1rem;
    }
  }
`;
