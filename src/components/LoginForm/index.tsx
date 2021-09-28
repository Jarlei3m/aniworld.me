import { Container } from './styles';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';

import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillEyeInvisible,
  AiFillEye,
} from 'react-icons/ai';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export function LoginForm() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [translate, setTranslate] = useState(false);
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const [session] = useSession();

  const { handleTranslateChange, translate } = useContext(LoginContext);
  const { handleChange, HandleSignInForm, isLoading, userInputs } =
    useContext(AuthContext);

  // function handleLogin(e: FormEvent) {
  //   e.preventDefault();

  //   const userData = {
  //     email,
  //     password,
  //   };
  //   setPassword('');
  //   setEmail('');
  //   setPasswordHidden(true);
  //   console.log(userData);
  // }

  function handleSignIn(provider: string) {
    signIn(provider, {
      callbackUrl: 'http://localhost:3000',
    });
  }

  // check if user is logged in
  if (session) {
    return <Redirect to="/" />;
  }

  console.log('session login:', session);

  return (
    <Container onSubmit={HandleSignInForm} translateX={translate}>
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
        <Link href="/forgot">
          <a>I forgot my password</a>
        </Link>
      </div>

      <button type="submit">{isLoading ? '...loading' : 'Login'}</button>

      <div>
        <span>Don´t have an account?</span>
        <Link href="/subscribe">
          <a onClick={() => handleTranslateChange('register')}>
            Subscribe now!
          </a>
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
