import { Container } from './styles';
import Link from 'next/link';

import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiOutlineLogin,
  AiFillGithub,
} from 'react-icons/ai';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: Event) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <Container>
      <h1>Login</h1>

      <form action="">
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>

        <div>
          <span>Don´t have an account?</span>
          <Link href="/register">
            <a>Register now!</a>
          </Link>
        </div>

        <div>
          <strong>Or</strong>
          <div>
            <AiFillGithub />
            <AiFillTwitterCircle />
            <RiFacebookCircleFill />
            <AiFillGoogleCircle />
          </div>
        </div>
      </form>
    </Container>
  );
}
