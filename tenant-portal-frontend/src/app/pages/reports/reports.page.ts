import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage {
  reportName = 'Mein Bericht';
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';

  rooms = {
    room1: true,
    room2: false,
  };

  intervalSelectOptions = { cssClass: 'wide-select-popover' };

  constructor(private router: Router, private toastCtrl: ToastController) {}

  close() {
    this.router.navigateByUrl('/tabs/dashboards');
  }

  openProfile() {
    this.router.navigateByUrl('/tabs/profile');
  }

  async sendReport() {
    const t = await this.toastCtrl.create({
      message: `Bericht "${this.reportName}" (${this.interval}) wird gesendet (Demo)`,
      duration: 1500,
      position: 'bottom',
    });
    await t.present();
  }
}
