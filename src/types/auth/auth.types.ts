import { User } from '@/types/user/user.types.ts';

export type Tokens = {
  access_token: string
  refresh_token: string
}

export interface IAuthResponse {
  tokens: Tokens;
  user: User;
}
