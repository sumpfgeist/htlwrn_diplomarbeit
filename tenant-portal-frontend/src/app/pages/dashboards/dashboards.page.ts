import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';

type Period = 'today' | 'day' | 'week' | 'month' | 'year';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
})
export class DashboardsPage {
  rooms: string[] = ['Raum 1', 'Raum 2'];
  selectedRoom = this.rooms[0];

  period: Period = 'year';
  viewDate: Date = new Date();

  roomSelectOptions = { cssClass: 'wide-select-popover' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  get dateLabel(): string {
    const locale = 'de-AT';

    if (this.period === 'year') {
      return `${this.viewDate.getFullYear()}`;
    }

    if (this.period === 'month') {
      return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.viewDate);
    }

    if (this.period === 'week') {
      const { week, year } = this.getIsoWeek(this.viewDate);
      return `KW ${week}/${year}`;
    }

    // day / today
    return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(this.viewDate);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  openProfile() {
    this.router.navigateByUrl('/tabs/profile');
  }

  setPeriod(p: Period) {
    this.period = p;
    if (p === 'today') this.viewDate = new Date();
    this.loadChart();
  }

  prev() {
    this.shift(-1);
  }

  next() {
    this.shift(+1);
  }

  private shift(dir: number) {
    const d = new Date(this.viewDate);

    switch (this.period) {
      case 'year':
        d.setFullYear(d.getFullYear() + dir);
        break;
      case 'month':
        d.setMonth(d.getMonth() + dir);
        break;
      case 'week':
        d.setDate(d.getDate() + dir * 7);
        break;
      case 'day':
      case 'today':
        d.setDate(d.getDate() + dir);
        break;
    }

    this.viewDate = d;
    this.loadChart();
  }

  loadChart() {
    // TODO: echte Daten
  }

  private getIsoWeek(date: Date): { week: number; year: number } {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return { week, year: d.getUTCFullYear() };
  }
}
