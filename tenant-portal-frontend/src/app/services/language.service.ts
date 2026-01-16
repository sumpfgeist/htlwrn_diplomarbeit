import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLang = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'app_lang';
  private current: AppLang = 'de';

  constructor(private translate: TranslateService) {
    // Default-Fallback
    this.translate.setDefaultLang('de');
  }

  /**
   * Wird beim App-Start über APP_INITIALIZER aufgerufen.
   * Liest die gespeicherte Sprache und aktiviert sie global.
   */
  init(): void {
    const saved = this.readStoredLang();
    const initial = saved ?? this.detectBrowserLang() ?? 'de';
    this.applyLanguage(initial);
  }

  getCurrent(): AppLang {
    return this.current;
  }

  setLanguage(lang: AppLang): void {
    this.applyLanguage(lang);
    this.storeLang(lang);
  }

  private applyLanguage(lang: AppLang): void {
    this.current = lang;

    // ngx-translate global umschalten
    this.translate.use(lang);

    // Optional, aber sauber: HTML lang setzen
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  private storeLang(lang: AppLang): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch {
      // z.B. Safari Private Mode: localStorage kann zicken. Dann halt ohne Persistenz.
    }
  }

  private readStoredLang(): AppLang | null {
    try {
      const v = localStorage.getItem(this.STORAGE_KEY);
      return v === 'de' || v === 'en' ? v : null;
    } catch {
      return null;
    }
  }

  private detectBrowserLang(): AppLang | null {
    if (typeof navigator === 'undefined') return null;

    const raw = (navigator.language || 'de').toLowerCase();
    if (raw.startsWith('de')) return 'de';
    if (raw.startsWith('en')) return 'en';
    return null;
  }
}
