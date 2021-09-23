import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { fauna } from '../services/fauna';
import { query as q } from 'faunadb';
import { toast } from 'react-toastify';

interface NewUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface userExists {
  ref: {
    email: string;
  };
}

interface SubscribeContextData {
  newUser: NewUserProps;
  isEmailValid: boolean;
  isPasswordsMatch: boolean;
  isLoading: boolean;
  handleSubscribeForm: (e: FormEvent) => Promise<void>;
  handleChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleKeyUp: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface SubscribeProvider {
  children: ReactNode;
}

export const SubscribeContext = createContext<SubscribeContextData>(
  {} as SubscribeContextData,
);

export function SubscribeProvider({ children }: SubscribeProvider) {
  const [newUser, setNewUser] = useState<NewUserProps>();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setNewUser({
        ...newUser,
        [name]: value,
      });
      console.log('on change:', newUser);
    },
    [newUser],
  );

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // Check Emails
      if (e.currentTarget.name === 'email') {
        if (e.currentTarget.value === '') {
          setIsEmailValid(true);
        } else {
          const emailFormat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          emailFormat.test(e.currentTarget.value)
            ? setIsEmailValid(true)
            : setIsEmailValid(false);
        }
      }

      // Check Confirm Password
      if (e.currentTarget.name === 'confirmPassword') {
        if (e.currentTarget.value === '') {
          setIsPasswordsMatch(true);
        } else {
          e.currentTarget.value === newUser.password
            ? setIsPasswordsMatch(true)
            : setIsPasswordsMatch(false);
        }
      }
      console.log('key up:', newUser);
      console.log(isPasswordsMatch);
    },
    [newUser],
  );

  async function handleSubscribeForm(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (isEmailValid && isPasswordsMatch) {
      try {
        await fetch('api/subscribe', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...newUser, createdAt: new Date() }),
        }).then((res) => {
          if (res.status === 201) {
            setNewUser({
              ...newUser,
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
            toast.success('Subscribed successfully.');
            setIsLoading(false);
            console.log('Subscribed successfully.');
          } else {
            toast.error('User arlready subscribed');
            setIsLoading(false);
            console.log('User arlready subscribed');
          }
        });

        console.log('dentro do context?');
      } catch (error) {
        console.log('ERROR', error);
      }
    } else {
      toast.error('Please, fill all fields correctly');
      setIsLoading(false);
    }
  }

  return (
    <SubscribeContext.Provider
      value={{
        handleSubscribeForm,
        isEmailValid,
        isPasswordsMatch,
        isLoading,
        newUser,
        handleChange,
        handleKeyUp,
      }}
    >
      {children}
    </SubscribeContext.Provider>
  );
}
