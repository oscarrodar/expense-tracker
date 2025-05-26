import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard] // Protect this route
  },
  {
    path: '',
    redirectTo: '/dashboard', // Default route
    pathMatch: 'full'
  },
  {
    path: '**', // Wildcard route
    redirectTo: '/dashboard' // Or a dedicated NotFoundComponent
  }
];
