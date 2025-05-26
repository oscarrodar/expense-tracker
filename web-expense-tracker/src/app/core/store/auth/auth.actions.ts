import { createAction, props } from '@ngrx/store';
import { User } from './auth.state';

export const initAuth = createAction('[Auth] Init Auth');
export const initAuthSuccess = createAction('[Auth] Init Auth Success', props<{ user: User | null }>());
export const initAuthFailure = createAction('[Auth] Init Auth Failure'); // For cases where checking auth state itself fails

export const googleLoginRequested = createAction('[Auth] Google Login Requested');
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const logoutRequested = createAction('[Auth] Logout Requested');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>());
