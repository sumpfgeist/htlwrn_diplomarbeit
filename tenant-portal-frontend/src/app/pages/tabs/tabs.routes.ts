import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboards',
        loadComponent: () =>
          import('../dashboards/dashboards.page').then(m => m.DashboardsPage),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('../reports/reports.page').then(m => m.ReportsPage),
      },
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
    ],
  },
];
