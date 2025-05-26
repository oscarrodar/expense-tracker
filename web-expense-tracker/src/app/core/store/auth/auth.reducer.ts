import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.initAuth, (state): AuthState => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.initAuthSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    isAuthenticated: !!user,
    isLoading: false,
    error: null,
  })),
   on(AuthActions.initAuthFailure, (state): AuthState => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: 'Failed to initialize auth state.', // Or a more specific error
  })),
  on(AuthActions.googleLoginRequested, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: error?.message || 'Login Failed',
  })),
  on(AuthActions.logoutRequested, (state): AuthState => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.logoutSuccess, (): AuthState => ({
    ...initialAuthState, // Reset to initial state on logout
  })),
  on(AuthActions.logoutFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error: error?.message || 'Logout Failed',
  }))
);
