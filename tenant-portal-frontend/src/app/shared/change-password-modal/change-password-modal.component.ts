import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  saving = false;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private auth: AuthService,
    private i18n: TranslateService
  ) {}

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  async save() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      await this.toast('CHANGE_PW.FILL_ALL');
      return;
    }

    if (this.newPassword.length < 8) {
      await this.toast('CHANGE_PW.WEAK');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.toast('CHANGE_PW.MISMATCH');
      return;
    }

    this.saving = true;
    this.auth.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: async () => {
        this.saving = false;
        await this.toast('CHANGE_PW.SUCCESS');
        this.modalCtrl.dismiss(true);
      },
      error: async () => {
        this.saving = false;
        await this.toast('CHANGE_PW.ERROR');
      },
    });
  }

  private async toast(key: string) {
    const msg = this.i18n.instant(key);
    const t = await this.toastCtrl.create({ message: msg, duration: 2000 });
    await t.present();
  }
}
