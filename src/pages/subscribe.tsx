import Head from 'next/head';
import { SubscribeForm } from '../components/SubscribeForm';
import { SubscribeProvider } from '../contexts/SubscribeContext';
import { ToastContainer } from 'react-toastify';

import { Container } from '../styles/Pages/Login/styles';

export default function Subscribe() {
  return (
    <Container>
      <Head>
        <title> Subscribe | Stream.me</title>
      </Head>

      {/* <ToastContainer> */}
      <SubscribeProvider>
        <SubscribeForm />
      </SubscribeProvider>
      {/* </ToastContainer> */}
    </Container>
  );
}
