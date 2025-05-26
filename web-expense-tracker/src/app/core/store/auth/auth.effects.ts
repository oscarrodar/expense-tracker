import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { User } from './auth.state';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      switchMap(() =>
        this.authService.authState$.pipe(
          map((firebaseUser) => {
            if (firebaseUser) {
              const user: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              };
              return AuthActions.initAuthSuccess({ user });
            } else {
              return AuthActions.initAuthSuccess({ user: null });
            }
          }),
          catchError(() => of(AuthActions.initAuthFailure())) // Should be rare
        )
      )
    )
  );

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.googleLoginRequested),
      exhaustMap(() =>
        this.authService.googleSignIn().pipe(
          map((credential) => {
            const firebaseUser = credential.user;
            if (firebaseUser) {
               const user: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              };
              return AuthActions.loginSuccess({ user });
            }
            // This case should ideally not happen if signInWithPopup resolves successfully
            return AuthActions.loginFailure({ error: 'User data not found after login.' });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutRequested),
      exhaustMap(() =>
        this.authService.signOut().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  // Optional: Redirect after login/logout
  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/'])) // Navigate to home or dashboard
      ),
    { dispatch: false }
  );

  logoutSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/login'])) // Navigate to login page
      ),
    { dispatch: false }
  );
}
