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
import { FormEvent, useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const { handleTranslateChange, translate } = useContext(LoginContext);

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (password === confirmPassword) {
      const newUserData = {
        name,
        email,
        password,
        confirmPassword,
      };
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordHidden(true);
      console.log('newUser:', newUserData);
    } else {
      alert('Error password');
    }
  }

  return (
    <Container onSubmit={(e) => handleLogin(e)} translateX={translate}>
      <h1>Register</h1>

      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={name}
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          required
          value={confirmPassword}
          type={confirmPassword ? 'password' : 'text'}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {isPasswordHidden ? (
          <AiFillEyeInvisible onClick={() => setPasswordHidden(false)} />
        ) : (
          <AiFillEye onClick={() => setPasswordHidden(true)} />
        )}
      </div>

      <button type="submit" onClick={(e) => handleLogin(e)}>
        Register
      </button>

      <div>
        <span>Already have an account?</span>
        <Link href="/login">
          <a onClick={() => handleTranslateChange('login')}>Login.</a>
        </Link>
      </div>
    </Container>
  );
}
