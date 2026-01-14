import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DsgvoModalComponent } from '../../shared/dsgvo-modal/dsgvo-modal.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
})
export class LoginPage {
  username = '';
  password = '';
  showPw = false;
  isLoading = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  async login() {
    if (!this.username.trim() || !this.password) {
      (await this.toastCtrl.create({ message: 'Bitte Username & Passwort eingeben.', duration: 1500 })).present();
      return;
    }

    this.isLoading = true;
    try {
      const ok = await this.performLogin(this.username, this.password);
      if (!ok) {
        (await this.toastCtrl.create({ message: 'Login fehlgeschlagen.', duration: 1500 })).present();
        return;
      }

      const accepted = localStorage.getItem('dsgvoAccepted') === 'true';
      if (!accepted) {
        const okDsgvo = await this.openDsgvoModal();
        if (!okDsgvo) {
          // Token/Session würdest du hier löschen (wenn vorhanden)
          this.password = '';
          return; // bleibt am Login
        }
      }

      await this.router.navigateByUrl('/tabs/dashboards', { replaceUrl: true });
    } finally {
      this.isLoading = false;
    }
  }

  // Platzhalter: hier später echte API-Auth einbauen.
  private async performLogin(_user: string, _pw: string): Promise<boolean> {
    return true;
  }

  async openDsgvoModal(): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: DsgvoModalComponent,
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    return data?.accepted === true;
  }

  async openDsgvo() {
    await this.openDsgvoModal();
  }
}
