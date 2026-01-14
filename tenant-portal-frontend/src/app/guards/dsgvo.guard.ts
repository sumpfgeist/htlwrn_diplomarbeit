import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { DsgvoService } from '../services/dsgvo.service';

@Injectable({
  providedIn: 'root',
})
export class DsgvoGuard implements CanActivate {
  constructor(private dsgvo: DsgvoService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Wenn DSGVO noch nicht akzeptiert ist, umleiten
    if (!this.dsgvo.isAccepted()) {
      return this.router.parseUrl('/dsgvo');
    }
    return true;
  }
}
