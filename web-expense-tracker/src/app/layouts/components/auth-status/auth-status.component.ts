import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../../core/store/auth/auth.state';
import * as AuthActions from '../../../../core/store/auth/auth.actions';
import { selectIsAuthenticated, selectUser } from '../../../../core/store/auth/auth.selectors';
import { AsyncPipe, NgIf } from '@angular/common'; // Import NgIf and AsyncPipe

@Component({
  selector: 'app-auth-status',
  template: `
    <div *ngIf="isAuthenticated$ | async; else notLoggedIn">
      <div *ngIf="user$ | async as currentUser">
        <p>Welcome, {{ currentUser.displayName || currentUser.email }}!</p>
        <img *ngIf="currentUser.photoURL" [src]="currentUser.photoURL" alt="User Photo" width="50">
        <button (click)="logout()">Sign Out</button>
      </div>
    </div>
    <ng-template #notLoggedIn>
      <!-- Optionally show a login button or message here, or leave blank -->
      <!-- For now, we assume login button is separate -->
    </ng-template>
  `,
  standalone: true, // Mark as standalone
  imports: [NgIf, AsyncPipe] // Import necessary modules for standalone
})
export class AuthStatusComponent {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectUser);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutRequested());
  }
}
