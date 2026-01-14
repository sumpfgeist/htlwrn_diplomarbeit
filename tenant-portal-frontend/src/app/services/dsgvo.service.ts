import { Injectable } from '@angular/core';

const DSGVO_KEY = 'tp_dsgvo_accepted';

@Injectable({ providedIn: 'root' })
export class DsgvoService {
  isAccepted(): boolean {
    return localStorage.getItem(DSGVO_KEY) === 'true';
  }

  accept(): void {
    localStorage.setItem(DSGVO_KEY, 'true');
  }

  clear(): void {
    localStorage.removeItem(DSGVO_KEY);
  }
}
