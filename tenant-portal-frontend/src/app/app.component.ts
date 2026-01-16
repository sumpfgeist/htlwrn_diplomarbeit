import { Component, OnDestroy, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  documentTextOutline,
  logOutOutline,
  personCircleOutline,
  closeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  private router = inject(Router);
  private sub: Subscription;

  constructor() {
    // Icons registrieren (sonst Warning-Spam)
    addIcons({
      'analytics-outline': analyticsOutline,
      'document-text-outline': documentTextOutline,
      'log-out-outline': logOutOutline,
      'person-circle-outline': personCircleOutline,
      'person-outline': personOutline,
      'close-outline': closeOutline,
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
    });

    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.unfreezePointerEvents();
        this.cleanupGhostOverlays();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private unfreezePointerEvents(): void {
    if (typeof document === 'undefined') return;

    // 1) Body
    document.body?.classList?.remove('disable-pointer-events');
    (document.body as HTMLElement).style.pointerEvents = 'auto';

    // 2) Alles, was Ionic manchmal “vergisst” wieder freizugeben
    document.querySelectorAll('.disable-pointer-events').forEach((el) => {
      (el as HTMLElement).classList.remove('disable-pointer-events');
      (el as HTMLElement).style.pointerEvents = 'auto';
    });

    // 3) Safety: Router-Outlets explizit
    document.querySelectorAll('ion-router-outlet, ion-nav').forEach((el) => {
      (el as HTMLElement).style.pointerEvents = 'auto';
    });
  }

  private cleanupGhostOverlays(): void {
    if (typeof document === 'undefined') return;

    const overlaySelector =
      'ion-modal, ion-alert, ion-popover, ion-loading, ion-action-sheet, ion-picker, ion-toast';

    // Unsichtbare Overlays entfernen, die sonst Klicks blocken können
    document.querySelectorAll(overlaySelector).forEach((el) => {
      const node = el as any;
      const htmlEl = el as HTMLElement;

      const ariaHidden = htmlEl.getAttribute('aria-hidden') === 'true';
      const style = window.getComputedStyle(htmlEl);
      const hidden =
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0';

      if (ariaHidden || hidden) {
        try { node.dismiss?.(); } catch {}
        try { node.remove?.(); } catch {}
      }
    });

    // Backdrops, die noch Klicks abfangen, entwaffnen / entfernen
    document.querySelectorAll('ion-backdrop').forEach((bd) => {
      const backdrop = bd as HTMLElement;
      const ariaHidden = backdrop.getAttribute('aria-hidden') === 'true';
      const style = window.getComputedStyle(backdrop);
      const hidden =
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0';

      const insideOverlay = backdrop.closest(overlaySelector);

      if (ariaHidden || hidden) {
        backdrop.style.pointerEvents = 'none';
        if (!insideOverlay) backdrop.remove();
      }
    });
  }
}
