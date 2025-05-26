import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../../core/store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../../core/store/auth/auth.selectors';
import { AsyncPipe, NgIf } from '@angular/common'; // Import NgIf and AsyncPipe

@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="!(isLoading$ | async); else loading">
      <button (click)="login()">Sign in with Google</button>
      <div *ngIf="error$ | async as errorMessage" style="color: red;">
        {{ errorMessage }}
      </div>
    </div>
    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  standalone: true, // Mark as standalone
  imports: [NgIf, AsyncPipe] // Import necessary modules for standalone
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.isLoading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    // Optional: Dispatch initAuth if not handled elsewhere (e.g. AppComponent)
    // this.store.dispatch(AuthActions.initAuth());
  }

  login(): void {
    this.store.dispatch(AuthActions.googleLoginRequested());
  }
}
