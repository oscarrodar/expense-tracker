import firebase from 'firebase/compat/app';

export interface User extends Pick<firebase.User, 'uid' | 'email' | 'displayName' | 'photoURL'> {}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
