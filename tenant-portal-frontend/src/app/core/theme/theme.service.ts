import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SystemTheme, SystemThemeResponse } from './theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme?: SystemTheme;

  constructor(private http: HttpClient) {}

  get theme(): SystemTheme | undefined {
    return this._theme;
  }

  async loadSystemTheme(): Promise<void> {
    const url = `${environment.apiBaseUrl}/get_system_theme`;
    const res = await firstValueFrom(this.http.get<SystemThemeResponse>(url));
    this._theme = res?.data;
    if (this._theme) this.applyThemeToCssVars(this._theme);
  }

  applyThemeToCssVars(t: SystemTheme): void {
    const root = document.documentElement;

    // Core Ionic vars
    root.style.setProperty('--ion-color-primary', t.primaryBasedOn);
    root.style.setProperty('--ion-color-primary-contrast', t.primaryContrast || '#ffffff');

    root.style.setProperty('--ion-color-secondary', t.accentBasedOn);
    root.style.setProperty('--ion-color-secondary-contrast', t.accentContrast || '#ffffff');

    // App token used across SCSS (tabs, icons, etc.)
    root.style.setProperty('--app-accent', t.accentBasedOn || t.primaryBasedOn);

    // Toolbar / header
    root.style.setProperty('--app-toolbar-bg', t.toolbarColor || t.primaryBasedOn);
    root.style.setProperty('--app-toolbar-fg', t.toolbarFontColor || '#ffffff');

    // Optional navbar/background
    if (t.navbarColor) root.style.setProperty('--app-navbar-bg', t.navbarColor);
    if (t.navbarFontColor) root.style.setProperty('--app-navbar-fg', t.navbarFontColor);
    if (t.backgroundColor) root.style.setProperty('--app-bg', t.backgroundColor);

    // Gradient toggle (like in your screenshots it’s pretty flat, but API supports it)
    root.style.setProperty('--app-gradient-enabled', t.gradient ? '1' : '0');

    // If palette exists, map a few helpful shades
    const p50 = t.colorPalette?.primary?.['50'];
    const p90 = t.colorPalette?.primary?.['90'];
    if (p50) root.style.setProperty('--app-primary-50', p50);
    if (p90) root.style.setProperty('--app-primary-90', p90);
  }
}
