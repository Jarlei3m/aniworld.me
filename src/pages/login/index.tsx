import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import { AuthBgImage } from '../../components/AuthComponents/AuthBgImage';
import { LoginForm } from '../../components/AuthComponents/LoginForm';

import { Container } from './styles';

export default function Login() {
  return (
    <Container>
      <Head>
        <title> Login | Aniworld.me</title>
      </Head>

      <ToastContainer icon={false} limit={3} />
      <AuthBgImage />
      <LoginForm />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const { ['aniworld.token']: token } = parseCookies({ req });

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
