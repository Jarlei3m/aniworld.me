import Head from 'next/head';
import { RegisterForm } from '../components/RegisterForm';
import { SubscribeProvider } from '../contexts/SubscribeContext';
import { ToastContainer } from 'react-toastify';

import { Container } from '../styles/Pages/Login/styles';

export default function Register() {
  return (
    <Container>
      <Head>
        <title> Register | Stream.me</title>
      </Head>

      {/* <ToastContainer> */}
      <SubscribeProvider>
        <RegisterForm />
      </SubscribeProvider>
      {/* </ToastContainer> */}
    </Container>
  );
}
