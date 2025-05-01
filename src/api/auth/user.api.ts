import { User } from '@/types/user/user.types.ts';
import { api } from '@/api/axios.ts';

export const userApi = {
  async getMe(): Promise<User> {
    const res = await api.get<User>('/user/me');
    return res.data;
  }
};
