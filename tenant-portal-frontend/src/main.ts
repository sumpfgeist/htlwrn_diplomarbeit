import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  documentTextOutline,
  eyeOutline,
  eyeOffOutline,
  logOutOutline,
  personCircleOutline,
  closeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
} from 'ionicons/icons';

function registerAppIcons(): void {
  addIcons({
    'analytics-outline': analyticsOutline,
    'document-text-outline': documentTextOutline,
    'eye-outline': eyeOutline,
    'eye-off-outline': eyeOffOutline,
    'log-out-outline': logOutOutline,
    'person-circle-outline': personCircleOutline,
    'person-outline': personOutline,
    'close-outline': closeOutline,
    'chevron-back-outline': chevronBackOutline,
    'chevron-forward-outline': chevronForwardOutline,
  });
}

function unfreezePointerEvents(): void {
  document.body?.classList?.remove('disable-pointer-events');
  (document.body as HTMLElement).style.pointerEvents = 'auto';
}

registerAppIcons();

bootstrapApplication(AppComponent, appConfig)
  .then((ref) => {
    const router = ref.injector.get(Router);

    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) console.log('[NAV] start', e.url);
      if (e instanceof NavigationEnd) console.log('[NAV] end', e.urlAfterRedirects);
      if (e instanceof NavigationCancel) console.log('[NAV] cancel', e.url);
      if (e instanceof NavigationError) console.log('[NAV] error', e.url, e.error);
    });

    unfreezePointerEvents();
  })
  .catch((err) => console.error(err));
