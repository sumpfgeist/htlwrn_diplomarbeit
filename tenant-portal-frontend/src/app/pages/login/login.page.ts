import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { DsgvoService } from '../../services/dsgvo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
})
export class LoginPage {
  username = '';
  password = '';
  showPw = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private dsgvo: DsgvoService,
    private router: Router,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {}

  // keep the template compatible with both names
  onLogin(): void {
    this.login();
  }

  login(): void {
    if (!this.username || !this.password) {
      void this.showToast(this.translate.instant('LOGIN.MISSING'));
      return;
    }

    this.loading = true;

    const result: any = (this.auth as any).login(this.username, this.password);

    // AuthService might return an Observable or a boolean (depending on your previous refactors).
    if (result && typeof result.subscribe === 'function') {
      result.subscribe({
        next: (res: any) => this.afterLogin(res),
        error: () => this.afterLogin(false),
      });
      return;
    }

    this.afterLogin(result);
  }

  private afterLogin(res: any): void {
    this.loading = false;

    const ok = !!res && res !== 'false';

    if (!ok) {
      void this.showToast(this.translate.instant('LOGIN.ERROR'));
      return;
    }

    // If DSGVO not accepted yet, route there first
    if (!this.dsgvo.isAccepted()) {
      sessionStorage.setItem('postDsgvoRedirect', '/tabs/dashboards');
      void this.router.navigateByUrl('/dsgvo');
      return;
    }

    void this.router.navigateByUrl('/tabs/dashboards');
  }

  togglePw(): void {
    this.showPw = !this.showPw;
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message || 'Fehler.',
      duration: 2500,
      position: 'bottom',
    });
    await toast.present();
  }
}
