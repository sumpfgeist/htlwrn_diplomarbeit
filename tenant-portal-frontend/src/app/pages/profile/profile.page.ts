import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { LanguageService, SupportedLang } from '../../services/language.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslatePipe],
})
export class ProfilePage {
  lang: SupportedLang = 'de';

  constructor(
    private language: LanguageService,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    this.lang = this.language.getCurrent();
  }

  onLangChange(): void {
    this.language.setLanguage(this.lang);
  }

  async logout(): Promise<void> {
    this.auth.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async openChangePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Passwort ändern',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Altes Passwort',
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Neues Passwort',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Neues Passwort bestätigen',
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Speichern',
          handler: (values) => {
            void this.handlePasswordChange(values.oldPassword, values.newPassword, values.confirmPassword);
            return false; // keep alert open until we decide
          },
        },
      ],
    });

    await alert.present();
  }

  private async handlePasswordChange(oldPw: string, newPw: string, confirmPw: string): Promise<void> {
    if (!newPw || newPw !== confirmPw) {
      const toast = await this.toastCtrl.create({
        message: 'Neues Passwort stimmt nicht überein.',
        duration: 1800,
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    const ok = this.auth.changePassword(oldPw, newPw);

    if (!ok) {
      const toast = await this.toastCtrl.create({
        message: 'Altes Passwort ist falsch.',
        duration: 1800,
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    // close alert manually
    const top = await this.alertCtrl.getTop();
    await top?.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Passwort geändert.',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
