import { Container, InputBox, WarningMessage } from './styles';
import Link from 'next/link';

import { FormEvent, useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { SubscribeContext } from '../../contexts/SubscribeContext';

export function SubscribeForm() {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  // CONTEXT
  const { handleTranslateChange, translate } = useContext(LoginContext);
  const {
    handleSubscribeForm,
    handleChange,
    handleKeyUp,
    newUser,
    isEmailValid,
    isPasswordValid,
    isPasswordsMatch,
  } = useContext(SubscribeContext);

  console.log('email valid:', isEmailValid);

  const warnings = {
    passwordLength: 'Minimum of 6 characteres',
    passwordMatchs: "Passwords don't match",
    emailInvalid: 'Email invalid',
  };

  return (
    <Container onSubmit={handleSubscribeForm} translateX={translate}>
      <h1>Subscribe</h1>

      <div>
        <label htmlFor="name">Name</label>
        <InputBox
          name="name"
          value={newUser?.name ? newUser.name : ''}
          required
          type="text"
          onChange={handleChange}
          isValid={true}
        />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <InputBox
          name="email"
          value={newUser?.email ? newUser.email : ''}
          required
          type="text"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          isValid={isEmailValid}
        />
        <WarningMessage isValid={isEmailValid}>
          {warnings.emailInvalid}
        </WarningMessage>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <InputBox
          name="password"
          required
          value={newUser?.password ? newUser.password : ''}
          type="password"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          isValid={isPasswordValid}
        />
        <WarningMessage isValid={isPasswordValid}>
          {warnings.passwordLength}
        </WarningMessage>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>

        <InputBox
          name="confirmPassword"
          required
          value={newUser?.confirmPassword ? newUser.confirmPassword : ''}
          type={isPasswordHidden ? 'password' : 'text'}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          isValid={isPasswordsMatch}
        />
        <WarningMessage isValid={isPasswordsMatch}>
          {warnings.passwordMatchs}
        </WarningMessage>
      </div>

      <button type="submit">Subscribe</button>

      <div>
        <span>Already have an account?</span>
        <Link href="/login">
          <a onClick={() => handleTranslateChange('login')}>Login.</a>
        </Link>
      </div>
    </Container>
  );
}
