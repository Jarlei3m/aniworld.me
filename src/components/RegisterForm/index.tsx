import { Container } from './styles';
import Link from 'next/link';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FormEvent, useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { SubscribeContext } from '../../contexts/SubscribeContext';

export function RegisterForm() {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  // CONTEXT
  const { handleTranslateChange, translate } = useContext(LoginContext);
  const {
    handleSubscribeForm,
    handleChange,
    handleKeyUp,
    newUser,
    isPasswordsMatch,
    isEmailValid,
  } = useContext(SubscribeContext);

  return (
    <Container onSubmit={handleSubscribeForm} translateX={translate}>
      <h1>Register</h1>

      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={newUser?.name ? newUser.name : ''}
          required
          type="text"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          value={newUser?.email ? newUser.email : ''}
          required
          type="text"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          required
          value={newUser?.password ? newUser.password : ''}
          type={isPasswordHidden ? 'password' : 'text'}
          onChange={handleChange}
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
          value={newUser?.confirmPassword ? newUser.confirmPassword : ''}
          type={isPasswordHidden ? 'password' : 'text'}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        {isPasswordHidden ? (
          <AiFillEyeInvisible onClick={() => setPasswordHidden(false)} />
        ) : (
          <AiFillEye onClick={() => setPasswordHidden(true)} />
        )}
      </div>
      {isPasswordsMatch ? null : <small>not match</small>}

      <button type="submit">Register</button>

      <div>
        <span>Already have an account?</span>
        <Link href="/login">
          <a onClick={() => handleTranslateChange('login')}>Login.</a>
        </Link>
      </div>
    </Container>
  );
}
