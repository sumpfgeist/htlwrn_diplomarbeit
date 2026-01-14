import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then(m => m.tabsRoutes),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },

  { path: '**', redirectTo: 'login' },  {
    path: 'dsgvo',
    loadChildren: () => import('./pages/dsgvo/dsgvo.module').then( m => m.DsgvoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
