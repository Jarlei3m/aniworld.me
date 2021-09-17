import { createContext, ReactNode, useState } from 'react';

interface LoginContextData {
  translate: string;
  handleTranslateChange: (page: string) => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext<LoginContextData>(
  {} as LoginContextData,
);

export function LoginProvider({ children }: LoginProviderProps) {
  const [translate, setTranslate] = useState('');

  function handleTranslateChange(page: string) {
    // if (page === 'login') {
    //   setTranslate(page);
    // } else {
    setTranslate(page);
    // }
  }

  console.log('translate:', translate);

  return (
    <LoginContext.Provider value={{ handleTranslateChange, translate }}>
      {children}
    </LoginContext.Provider>
  );
}
