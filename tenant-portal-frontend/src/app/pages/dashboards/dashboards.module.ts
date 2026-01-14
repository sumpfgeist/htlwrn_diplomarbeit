import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule, TranslateModule],
})
export class DashboardsPage {
  rooms = ['Raum 1', 'Raum 2'];
  selectedRoom = this.rooms[0];

  viewYear = new Date().getFullYear();

  constructor(private router: Router) {}

  prevYear() {
    this.viewYear--;
    this.loadChart();
  }

  nextYear() {
    this.viewYear++;
    this.loadChart();
  }

  loadChart() {
    // TODO: API Call mit (selectedRoom, viewYear) und Chart updaten
  }

  async logout() {
    // TODO: Token löschen wenn vorhanden
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
