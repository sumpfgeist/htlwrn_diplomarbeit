import { Injectable } from '@angular/core';

/**
 * Minimal demo auth service.
 * If you have a backend, swap the internals (keep the method signatures),
 * because other parts of the app depend on them.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keyLoggedIn = 'loggedIn';
  private readonly keyUsername = 'username';
  private readonly keyPassword = 'password_demo_only';
  private readonly keyDsgvo = 'dsgvoAccepted';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.keyLoggedIn) === 'true';
  }

  login(username: string, password: string): boolean {
    const u = username.trim();
    const p = password;

    if (!u || !p) return false;

    localStorage.setItem(this.keyLoggedIn, 'true');
    localStorage.setItem(this.keyUsername, u);

    // Demo-only: remember password so we can validate "old password" in the popup.
    // In a real app, never store plaintext passwords in localStorage.
    if (!localStorage.getItem(this.keyPassword)) {
      localStorage.setItem(this.keyPassword, p);
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.keyLoggedIn);
    localStorage.removeItem(this.keyUsername);
  }

  hasAcceptedDsgvo(): boolean {
    return localStorage.getItem(this.keyDsgvo) === 'true';
  }

  setDsgvoAccepted(accepted: boolean): void {
    localStorage.setItem(this.keyDsgvo, accepted ? 'true' : 'false');
  }

  changePassword(oldPassword: string, newPassword: string): boolean {
    const current = localStorage.getItem(this.keyPassword);

    if (!current || current !== oldPassword) return false;
    if (!newPassword) return false;

    localStorage.setItem(this.keyPassword, newPassword);
    return true;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

}
