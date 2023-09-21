import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthPages/AuthContext';
import { Container } from './styles';

export function LoginForm() {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const { handleChange, HandleSignInForm, isLoading, userInputs } =
    useContext(AuthContext);

  function handleSignIn(provider: string) {
    signIn(provider, {
      callbackUrl: 'http://localhost:3000',
    });
  }

  return (
    <Container onSubmit={HandleSignInForm}>
      <h1>Login</h1>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          value={userInputs?.email ? userInputs.email : ''}
          required
          type="email"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          autoComplete="off"
          required
          value={userInputs?.password ? userInputs.password : ''}
          type={isPasswordHidden ? 'password' : 'text'}
          onChange={handleChange}
        />
        {isPasswordHidden ? (
          <AiFillEyeInvisible onClick={() => setPasswordHidden(false)} />
        ) : (
          <AiFillEye onClick={() => setPasswordHidden(true)} />
        )}
        <Link href="/#">
          <a>I forgot my password</a>
        </Link>
      </div>

      <button type="submit">{isLoading ? '...loading' : 'Login'}</button>

      <div>
        <span>Don´t have an account?</span>
        <Link href="/subscribe">
          <a>Subscribe now!</a>
        </Link>
      </div>

      <div>
        <strong>Or</strong>
        <div>
          <AiFillGithub onClick={() => handleSignIn('github')} />
          <AiFillTwitterCircle onClick={() => handleSignIn('twitter')} />
          <AiFillGoogleCircle onClick={() => handleSignIn('google')} />
        </div>
      </div>
    </Container>
  );
}
