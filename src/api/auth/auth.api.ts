import { ISignInFormInput, ISignUpFormInput } from '@/utils/validation/schemas/auth/auth-form.schema.ts';
import { api } from '@/api/axios.ts';
import { IAuthResponse } from '@/types/auth/auth.types.ts';

export const authApi = {
  async signIn(payload: ISignInFormInput): Promise<IAuthResponse> {
    const res = await api.post('/auth/sign-in', payload);
    return res.data;
  },

  async signUp(payload: ISignUpFormInput): Promise<IAuthResponse> {
    const res = await api.post('/auth/sign-up', payload);
    return res.data;
  },

  async refresh(payload: string): Promise<IAuthResponse> {
    const res = await api.post('/auth/refresh', { refreshToken: payload });

    return res.data;
  }
};
