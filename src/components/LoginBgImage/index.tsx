import Image from 'next/image';
import bg_image from '../../../public/assets/login_bg.jpg';
import { BgImageContainer } from './styles';

export function LoginBgImage() {
  return (
    <BgImageContainer>
      <Image src={bg_image} alt="Animes picture" />
    </BgImageContainer>
  );
}
