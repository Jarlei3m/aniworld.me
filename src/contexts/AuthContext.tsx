import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { recoverUserInfo } from '../pages/api/recoverUserInfo';
// import { logOut } from '../pages/api/logout';

interface UserInputsProps {
  email: string;
  password: string;
}

interface UserProps {
  name?: string;
  email?: string;
  image?: string;
  createdAt?: string;
}

interface SignInResponseProps {
  user: UserProps;
  token: string;
}

interface AuthContextData {
  user: UserProps;
  userInputs: UserInputsProps;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleSignInResponse: (apiResponse: Promise<SignInResponseProps>) => void;
  HandleSignInForm: (e: FormEvent) => Promise<void>;
  handleChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCredentialsLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userInputs, setUserInputs] = useState<UserInputsProps | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'aniworld.token': token } = parseCookies();

    // check if it has saved tokens on cookies
    if (token) {
      recoverUserInfo(token).then((response) => {
        setUser(response.user);
        // Router.push('/');
      });
    }
  }, []);

  const handleCredentialsLogout = async () => {
    // const { 'aniworld.token': token } = parseCookies();

    destroyCookie(null, 'aniworld.token');
    Router.push('/login');

    //# Missing function to unvalidate token after logout
  };

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;

      setUserInputs({
        ...userInputs,
        [name]: value,
      });
      console.log('user login inputs:', userInputs);
    },
    [userInputs],
  );

  async function handleSignInResponse(
    apiResponse: Promise<SignInResponseProps>,
  ) {
    const { user, token } = await apiResponse;

    setCookie(undefined, 'aniworld.token', token, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    setUser(user);

    // Router.push('/');
  }

  async function HandleSignInForm(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch('api/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userInputs }),
      }).then((res) => {
        if (res.status === 200) {
          handleSignInResponse(res.json());
          Router.push('/');
        } else if (res.status === 500) {
          toast.error('Email or password is incorrect. Please try again!', {
            autoClose: 6000,
          });
          setIsLoading(false);
        } else {
          toast.error(
            'User not found, please access by social login or subscribe.',
            {
              autoClose: 6000,
            },
          );
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log('ERROR', error);
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        handleSignInResponse,
        HandleSignInForm,
        handleChange,
        userInputs,
        handleCredentialsLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
