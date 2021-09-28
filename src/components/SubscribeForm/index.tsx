import { Container, InputBox, SubmitButton, WarningMessage } from './styles';
import Link from 'next/link';

import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { SubscribeContext } from '../../contexts/SubscribeContext';
import { useRouter } from 'next/router';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

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
    isLoading,
  } = useContext(SubscribeContext);

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
          id="name"
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
          id="email"
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
          id="password"
          name="password"
          autoComplete="off"
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
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="off"
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

      <SubmitButton type="submit" disabled={isLoading || (!newUser && true)}>
        Subscribe {isLoading ? '...loading' : ''}
      </SubmitButton>

      <div>
        <span>Already have an account?</span>
        <Link href="/login">
          <a onClick={() => handleTranslateChange('login')}>Login.</a>
        </Link>
      </div>
    </Container>
  );
}
