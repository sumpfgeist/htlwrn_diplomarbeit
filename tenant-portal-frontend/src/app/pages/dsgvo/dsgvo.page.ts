import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { DsgvoService } from '../../services/dsgvo.service';

@Component({
  selector: 'app-dsgvo',
  standalone: true,
  templateUrl: './dsgvo.page.html',
  styleUrls: ['./dsgvo.page.scss'],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class DsgvoPage {
  private readonly defaultRedirect = '/tabs/dashboards';

  constructor(
    private router: Router,
    private auth: AuthService,
    public dsgvo: DsgvoService,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {}

  async accept(): Promise<void> {
    this.dsgvo.accept();

    const redirect = sessionStorage.getItem('postDsgvoRedirect') || this.defaultRedirect;
    sessionStorage.removeItem('postDsgvoRedirect');

    await this.router.navigateByUrl(redirect);
  }

  async decline(): Promise<void> {
    this.dsgvo.clear();
    this.auth.logout();

    const toast = await this.toastCtrl.create({
      message: this.translate.instant('DSGVO.DECLINED') || 'Datenschutz abgelehnt.',
      duration: 2500,
      position: 'bottom',
    });
    await toast.present();

    await this.router.navigateByUrl('/login');
  }
}
