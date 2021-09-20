import Head from 'next/head';
import { RegisterForm } from '../components/RegisterForm';

import { Container } from '../styles/Pages/Login/styles';

export default function Register() {
  return (
    <Container>
      <Head>
        <title> Register | Stream.me</title>
      </Head>

      <RegisterForm />
    </Container>
  );
}
