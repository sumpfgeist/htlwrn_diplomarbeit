import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'dsgvo',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dsgvo/dsgvo.page').then((m) => m.DsgvoPage),
  },

  // ✅ Profile ist KEIN Tab
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },

  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'dashboards',
        loadComponent: () =>
          import('./pages/dashboards/dashboards.page').then((m) => m.DashboardsPage),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./pages/reports/reports.page').then((m) => m.ReportsPage),
      },

      // falls irgendwo noch drauf verlinkt wird:
      { path: 'profile', redirectTo: '/profile', pathMatch: 'full' },

      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

// backwards-compat alias
export const appRoutes = routes;
