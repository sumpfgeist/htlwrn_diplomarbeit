import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  name = 'Max Mustermann';
  email = 'max@example.com';

  lang: 'de' | 'en' = 'de';

  constructor(
    private auth: AuthService,
    private router: Router,
    private langService: LanguageService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private i18n: TranslateService
  ) {
    this.lang = this.langService.getCurrent();
  }

  onLangChange() {
    this.langService.setLanguage(this.lang);
  }

  async openChangePassword() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalComponent,
    });
    await modal.present();

    const res = await modal.onWillDismiss<boolean>();
    if (res.data === true) {
      const t = await this.toastCtrl.create({
        message: this.i18n.instant('CHANGE_PW.SUCCESS'),
        duration: 2000,
      });
      await t.present();
    }
  }

  save() {
    // TODO: speichern per API
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
