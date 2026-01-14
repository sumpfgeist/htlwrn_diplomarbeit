import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { I18nService } from '../../core/i18n.service';
import { ChangePasswordModalComponent } from '../../shared/change-password-modal/change-password-modal.component';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule, TranslateModule],
})
export class ProfilePage {
  name = 'Max Mustermann';
  email = 'max@example.com';

  lang: 'de' | 'en' = 'de';

  constructor(
    private router: Router,
    private i18n: I18nService,
    private modalCtrl: ModalController,
    private toast: ToastController
  ) {
    this.lang = this.i18n.current;
  }

  onLangChange() {
    this.i18n.setLanguage(this.lang);
  }

  async save() {
    // TODO: API speichern (wenn du willst)
    this.i18n.setLanguage(this.lang);
    (await this.toast.create({ message: 'Gespeichert (Demo).', duration: 1500 })).present();
  }

  async openChangePassword() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalComponent,
      backdropDismiss: false,
    });
    await modal.present();
  }

  async close() {
    await this.router.navigateByUrl('/tabs/dashboards');
  }
}
