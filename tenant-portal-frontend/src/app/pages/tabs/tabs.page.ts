import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterOutlet, RouterLink, TranslateModule],
})
export class TabsPage {}
