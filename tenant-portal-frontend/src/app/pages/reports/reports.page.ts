import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class ReportsPage {
  reportName = 'Neuer Bericht';
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
  rooms = { room1: true, room2: false };

  sendReport() {
    console.log('send report', { name: this.reportName, interval: this.interval, rooms: this.rooms });
  }
}
