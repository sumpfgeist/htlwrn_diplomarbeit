import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslatePipe],
})
export class ReportsPage {
  name = '';
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async close(): Promise<void> {
    await this.router.navigateByUrl('/tabs/dashboards');
  }

  async send(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Report wurde (demo) gesendet.',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
