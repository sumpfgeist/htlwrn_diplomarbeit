import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
})
export class DashboardsPage {
  rooms: string[] = ['Raum 1', 'Raum 2'];
  selectedRoom = this.rooms[0];

  viewYear = new Date().getFullYear();

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  prevYear() {
    this.viewYear--;
    this.loadChart();
  }

  nextYear() {
    this.viewYear++;
    this.loadChart();
  }

  loadChart() {
    // TODO: hier später echte API holen (z.B. abhängig von Raum + viewYear)
    // Aktuell reicht es, dass UI und Flow stimmt.
  }
}
