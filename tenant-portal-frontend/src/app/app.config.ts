import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';

import { IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { LanguageService } from './services/language.service';

export function httpLoaderFactory(http: HttpClient) {
  // Standard ngx-translate setup: ./assets/i18n/<lang>.json
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initLang(langService: LanguageService) {
  return () => langService.init();
}

export const appConfig = {
  providers: [
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'de',
      })
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initLang,
      deps: [LanguageService],
      multi: true,
    },
  ],
};
