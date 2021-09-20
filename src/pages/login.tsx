import Head from 'next/head';
import { LoginForm } from '../components/LoginForm';

import { Container } from '../styles/Pages/Login/styles';

export default function Login() {
  return (
    <Container>
      <Head>
        <title> Login | Stream.me</title>
      </Head>
      <LoginForm />
    </Container>
  );
}
