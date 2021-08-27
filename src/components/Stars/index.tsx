import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Container } from './styles';

export function Stars({ averageScore }) {
  const score = averageScore / 20;

  const scoreStars = Array.from({ length: 5 }, (_, index) => {
    const acc = index + 0.5;

    return (
      <span key={index}>
        {score >= index + 1 ? (
          <BsStarFill />
        ) : score >= acc ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return <Container>{scoreStars}</Container>;
}
