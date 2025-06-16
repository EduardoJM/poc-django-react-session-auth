import { createContext } from 'react';
import type { User } from './auth-types';

export interface AuthContextValue {
  user: User | null;
}

export const AuthContext = createContext({ user: null } as AuthContextValue);
