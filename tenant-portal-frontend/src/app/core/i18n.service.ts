import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANG_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  constructor(private translate: TranslateService) {
    const lang = (localStorage.getItem(LANG_KEY) as 'de' | 'en') || 'de';
    this.translate.setDefaultLang('de');
    this.translate.use(lang);
  }

  get current(): 'de' | 'en' {
    return (this.translate.currentLang as 'de' | 'en') || 'de';
  }

  setLanguage(lang: 'de' | 'en') {
    localStorage.setItem(LANG_KEY, lang);
    this.translate.use(lang);
  }
}
