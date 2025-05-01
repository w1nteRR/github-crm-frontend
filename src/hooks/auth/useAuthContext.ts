import { useContext } from 'react';
import { AuthContext } from '@/providers/auth.provider.tsx';

export const useAuthContext = () => useContext(AuthContext);
