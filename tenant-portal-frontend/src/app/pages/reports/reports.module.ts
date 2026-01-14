import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule, TranslateModule],
})
export class ReportsPage {
  reportName = '';
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';

  rooms = {
    room1: true,
    room2: false,
  };

  constructor(private router: Router, private toast: ToastController) {}

  async close() {
    await this.router.navigateByUrl('/tabs/dashboards');
  }

  async sendReport() {
    // TODO: API Call fürs Report-Senden
    (await this.toast.create({ message: 'Report gesendet (Demo).', duration: 1500 })).present();
  }
}
