import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import { AuthBgImage } from '../../components/AuthComponents/AuthBgImage';
import { SubscribeForm } from '../../components/AuthComponents/SubscribeForm';
import { SubscribeProvider } from '../../contexts/AuthPages/SubscribeContext';
import { Container } from '../login/styles';

export default function Subscribe() {
  return (
    <Container>
      <Head>
        <title> Subscribe | Stream.me</title>
      </Head>

      <ToastContainer icon={false} limit={3} />
      <AuthBgImage />
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
