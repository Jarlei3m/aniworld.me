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
      position: relative;

      small {
        position: absolute;
        font-weight: bold;
        font-size: 0.7rem;
        top: 0;
        left: 0;
        background-color: var(--gray-500);
        padding: 0.5rem;
        border-radius: 12px 0px 12px 0px;
        /* z-index: 9999; */
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        color: var(--green-500);
      }

      img {
        width: 18rem;
        height: 14rem;
        object-fit: cover;
        object-position: center;
        display: block;
      }

      iframe,
      video {
        width: 18rem;
        height: 14rem;

        svg {
          font-size: 2.6rem;
        }
      }

      div:first-child {
        width: 100% !important;
        height: 14rem !important;
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
