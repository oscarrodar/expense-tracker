import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router'; // Ensure RouterOutlet is imported
import { NgIf, AsyncPipe } from '@angular/common';

import { AuthStatusComponent } from './layouts/components/auth-status/auth-status.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { selectIsAuthenticated, initAuth } from './core/store/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf, // For *ngIf
    AsyncPipe, // For | async pipe
    RouterOutlet,
    AuthStatusComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Changed styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'web-expense-tracker';
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    this.store.dispatch(initAuth());
  }
}
