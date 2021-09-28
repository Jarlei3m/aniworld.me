import Head from 'next/head';
import { SubscribeForm } from '../components/SubscribeForm';
import { SubscribeProvider } from '../contexts/SubscribeContext';
import { ToastContainer } from 'react-toastify';

import { Container } from '../styles/Pages/Login/styles';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';

export default function Subscribe() {
  return (
    <Container>
      <Head>
        <title> Subscribe | Stream.me</title>
      </Head>

      <ToastContainer icon={false} limit={3} />
      <SubscribeProvider>
        <SubscribeForm />
      </SubscribeProvider>
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
