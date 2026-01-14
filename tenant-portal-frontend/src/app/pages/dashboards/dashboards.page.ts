import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslatePipe],
})
export class DashboardsPage {
  rooms: string[] = ['Wohnzimmer', 'Schlafzimmer', 'Küche', 'Bad'];
  selectedRoom: string = this.rooms[0];

  viewYear: number = new Date().getFullYear();

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  async logout(): Promise<void> {
    this.auth.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  prevYear(): void {
    this.viewYear -= 1;
    void this.loadChart();
  }

  nextYear(): void {
    this.viewYear += 1;
    void this.loadChart();
  }

  async loadChart(): Promise<void> {
    // Placeholder: plug your real chart data source in here.
    const toast = await this.toastCtrl.create({
      message: `Chart geladen: ${this.selectedRoom} (${this.viewYear})`,
      duration: 800,
      position: 'bottom',
    });
    await toast.present();
  }
}
