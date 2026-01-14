import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-dsgvo-modal',
  templateUrl: './dsgvo-modal.component.html',
  styleUrls: ['./dsgvo-modal.component.scss'],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class DsgvoModalComponent {
  constructor(private modalCtrl: ModalController) {}

  dismiss(accepted: boolean) {
    if (accepted) {
      localStorage.setItem('dsgvoAccepted', 'true');
    }
    this.modalCtrl.dismiss({ accepted });
  }
}
