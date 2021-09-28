import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import { LoginForm } from '../components/LoginForm';

import { Container } from '../styles/Pages/Login/styles';

export default function Login() {
  return (
    <Container>
      <Head>
        <title> Login | Stream.me</title>
      </Head>

      <ToastContainer icon={false} limit={3} />
      <LoginForm />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { ['aniworld.token']: token } = parseCookies(ctx);

  if (token || session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
