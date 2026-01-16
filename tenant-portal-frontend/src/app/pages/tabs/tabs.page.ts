import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, TranslateModule],
})
export class TabsPage {}
