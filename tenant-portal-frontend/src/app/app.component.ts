import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { I18nService } from './core/i18n.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [IonicModule, RouterModule],
})
export class AppComponent {
  // Nur damit der Service beim App-Start initialisiert wird.
  constructor(private i18n: I18nService) {}
}
