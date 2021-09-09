import styled from 'styled-components';

export const TrendingListContainer = styled.section`
  width: 100%;
  padding: 2rem 0;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    li {
      width: 18rem;
      height: 18rem;
      border-radius: 12px;
      overflow: hidden;
      background-color: var(--gray-100);

      img {
        width: 18rem;
        height: 14rem;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
        display: block;
      }

      iframe,
      video {
        width: 18rem;
        height: 14rem;
      }

      div:first-child {
        width: 100% !important;
        height: 14rem !important;

        svg {
          font-size: 2.5rem;
        }
      }

      div:nth-child(2) {
        padding: 0.8rem 1rem;

        h4 {
          font-size: 0.925rem;
        }

        article {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          margin-top: 0.4rem;

          span {
            color: var(--gray-300);

            &:first-child {
              display: flex;
              align-items: center;

              svg {
                color: var(--yellow-500);
                margin-right: 0.2rem;
              }
            }

            &:not(:first-child) {
              margin-left: 0.5rem;
            }
          }
        }
      }
    }
  }
`;
