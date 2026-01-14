import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage) },

  {
    path: 'tabs',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: 'dashboards', loadComponent: () => import('./pages/dashboards/dashboards.page').then((m) => m.DashboardsPage) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports.page').then((m) => m.ReportsPage) },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage) },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
