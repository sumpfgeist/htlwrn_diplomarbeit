import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, TranslateModule],
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

  constructor(private router: Router) {}

  close() {
    // Du bist in Tabs, also navigier sauber zurück
    this.router.navigateByUrl('/tabs/dashboards');
  }

  sendReport() {
    // TODO: echte Report-API
    console.log('Sending report', {
      reportName: this.reportName,
      interval: this.interval,
      rooms: this.rooms,
    });
  }
}
