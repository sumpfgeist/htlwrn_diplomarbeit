import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLang = 'de' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'lang';
  private readonly supported: SupportedLang[] = ['de', 'en'];

  constructor(private translate: TranslateService) {}

  /**
   * Initialize language on app start.
   * Uses localStorage (lang) if present, otherwise falls back to "de".
   */
  init(): void {
    const stored = localStorage.getItem(this.storageKey) as SupportedLang | null;
    const lang: SupportedLang = stored && this.supported.includes(stored) ? stored : 'de';

    // ngx-translate v17+: setFallbackLang replaces setDefaultLang
    this.translate.setFallbackLang('de');
    void this.translate.use(lang);
  }

  getCurrent(): SupportedLang {
    const current = this.translate.getCurrentLang() as SupportedLang | undefined;
    if (current === 'de' || current === 'en') return current;

    const stored = localStorage.getItem(this.storageKey);
    return stored === 'en' ? 'en' : 'de';
  }

  /**
   * Backwards-friendly alias (your ProfilePage used currentLang()).
   */
  currentLang(): SupportedLang {
    return this.getCurrent();
  }

  setLanguage(lang: SupportedLang): void {
    localStorage.setItem(this.storageKey, lang);
    void this.translate.use(lang);
  }
}
