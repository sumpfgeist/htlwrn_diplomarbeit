import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Small wrapper around ngx-translate to keep app.component clean.
 * Note: With LanguageService + APP_INITIALIZER this is mostly redundant,
 * but it avoids breaking older code that expects I18nService.init().
 */
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService) {}

  init(): void {
    const stored = localStorage.getItem('lang');
    const lang = stored === 'en' ? 'en' : 'de';

    this.translate.setFallbackLang('de');
    void this.translate.use(lang);
  }
}
