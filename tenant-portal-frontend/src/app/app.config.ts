import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { LanguageService } from './services/language.service';

export function initLanguage(language: LanguageService) {
  return () => language.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),

    // ✅ wichtig für Ionic Navigation / Tabs
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // ngx-translate (v17+) style providers
    provideTranslateService({
      fallbackLang: 'de',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),

    {
      provide: APP_INITIALIZER,
      useFactory: initLanguage,
      deps: [LanguageService],
      multi: true,
    },
  ],
};
