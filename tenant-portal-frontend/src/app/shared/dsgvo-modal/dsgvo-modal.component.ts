import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dsgvo-modal',
  templateUrl: './dsgvo-modal.component.html',
  styleUrls: ['./dsgvo-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DsgvoModalComponent {
  constructor(private modalCtrl: ModalController) {}

  dismiss(accepted: boolean) {
    if (accepted) localStorage.setItem('dsgvoAccepted', 'true');
    this.modalCtrl.dismiss({ accepted });
  }
}
