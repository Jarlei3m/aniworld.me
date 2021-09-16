import { LoginForm } from '../components/LoginForm';
import { Container } from '../styles/Pages/Login/styles';

import Image from 'next/image';
import bg_image from '../../public/assets/login_bg.jpg';

export default function Login() {
  return (
    <Container>
      <Image src={bg_image} alt="Animes picture" />
      <LoginForm />
    </Container>
  );
}
