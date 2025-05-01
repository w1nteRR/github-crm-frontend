import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { User } from '@/types/user/user.types.ts';
import { ISignInFormInput, ISignUpFormInput } from '@/utils/validation/schemas/auth/auth-form.schema.ts';
import { authApi } from '@/api/auth/auth.api.ts';
import { api } from '@/api/axios.ts';
import { Tokens } from '@/types/auth/auth.types.ts';
import { userApi } from '@/api/auth/user.api.ts';

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signIn: (payload: ISignInFormInput) => Promise<void>;
  signUp: (payload: ISignUpFormInput) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const _setUpTokens = (tokens: Tokens): void => {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
  };

  const _clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
  };

  const signIn = async (payload: ISignInFormInput): Promise<void> => {
    setIsLoading(true);

    try {
      const { tokens, user } = await authApi.signIn(payload);

      _setUpTokens(tokens);
      setUser(user);

    } catch (error) {

      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }

      console.error('Sign-in error:', error);
      throw error;

    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (payload: ISignUpFormInput): Promise<void> => {
    setIsLoading(true);

    try {
      const { user } = await authApi.signUp(payload);

      setUser(user);

      alert('User has been created.');

    } catch (error) {

      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }

      console.error('Sign-up error:', error);
      throw error;

    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const user = await userApi.getMe();

      setUser(user);
    } catch (error) {
      _clearTokens();
      console.warn('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getCurrentUser();

      setIsLoading(false);
    };

    void init();
  }, []);

  const authValue = useMemo(
    () => ({ user, isLoading, signIn, signUp }),
    [isLoading, user]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
