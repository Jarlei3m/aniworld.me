import Image from 'next/image';
import { BgImageContainer } from './styles';
import bg_image from '/public/assets/login_bg.jpg';

export function AuthBgImage() {
  return (
    <BgImageContainer>
      <Image
        src={bg_image.src}
        alt="Animes picture"
        priority={true}
        layout="fill"
      />
    </BgImageContainer>
  );
}
