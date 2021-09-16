import { Container } from './styles';
import Link from 'next/link';

import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiOutlineLogin,
  AiFillGithub,
  AiFillEyeInvisible,
  AiFillEye,
} from 'react-icons/ai';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { FormEvent, useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    setPassword('');
    setEmail('');
    setPasswordHidden(true);
    console.log(userData);
  }

  return (
    <Container onSubmit={(e) => handleLogin(e)}>
      <h1>Login</h1>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          value={email}
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          required
          value={password}
          type={isPasswordHidden ? 'password' : 'text'}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordHidden ? (
          <AiFillEyeInvisible onClick={() => setPasswordHidden(false)} />
        ) : (
          <AiFillEye onClick={() => setPasswordHidden(true)} />
        )}
      </div>

      <button type="submit" onClick={(e) => handleLogin(e)}>
        Login
      </button>

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
    </Container>
  );
}
