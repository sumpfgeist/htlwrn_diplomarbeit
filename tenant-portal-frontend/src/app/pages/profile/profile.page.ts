import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { LanguageService, AppLang } from '../../services/language.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  name = 'Max Mustermann';
  email = 'max@example.com';

  lang: AppLang = 'de';

  constructor(
    private auth: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.lang = this.languageService.getCurrent();
  }

  onLangChange() {
    this.languageService.setLanguage(this.lang);
  }

  async openChangePassword() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalComponent,
    });
    await modal.present();
  }

  save() {
    // TODO: speichern per API
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
