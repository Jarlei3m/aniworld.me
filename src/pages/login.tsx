import { LoginForm } from '../components/LoginForm';
import { LoginBgImage } from '../components/LoginBgImage';

import { Container } from '../styles/Pages/Login/styles';

// import Image from 'next/image';
// import bg_image from '../../public/assets/login_bg.jpg';

export default function Login() {
  return (
    <Container>
      {/* <LoginBgImage /> */}
      <LoginForm />
    </Container>
  );
}
