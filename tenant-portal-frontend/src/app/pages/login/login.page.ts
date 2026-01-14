import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { DsgvoModalComponent } from '../../shared/dsgvo-modal/dsgvo-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslatePipe],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {}

  async onLogin(): Promise<void> {
    const ok = this.auth.login(this.username, this.password);

    if (!ok) {
      const toast = await this.toastCtrl.create({
        message: 'Login fehlgeschlagen',
        duration: 1800,
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    // DSGVO modal only on first successful login
    if (!this.auth.hasAcceptedDsgvo()) {
      const modal = await this.modalCtrl.create({
        component: DsgvoModalComponent,
      });

      await modal.present();
      const { data } = await modal.onWillDismiss<{ accepted: boolean }>();

      const accepted = !!data?.accepted;

      if (!accepted) {
        this.auth.logout();
        await this.router.navigateByUrl('/login', { replaceUrl: true });
        return;
      }

      this.auth.setDsgvoAccepted(true);
    }

    await this.router.navigateByUrl('/tabs/dashboards', { replaceUrl: true });
  }
}
