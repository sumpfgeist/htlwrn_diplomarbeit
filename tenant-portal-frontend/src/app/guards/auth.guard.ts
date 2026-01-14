import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  // Extra safety: if someone bypasses the DSGVO modal, kick them back to login.
  if (!auth.hasAcceptedDsgvo()) {
    auth.logout();
    return router.parseUrl('/login');
  }

  return true;
};
