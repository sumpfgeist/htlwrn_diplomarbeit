import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dsgvo-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  templateUrl: './dsgvo-modal.component.html',
  styleUrls: ['./dsgvo-modal.component.scss'],
})
export class DsgvoModalComponent {
  constructor(private modalCtrl: ModalController) {}

  async dismiss(accepted: boolean) {
    // wichtig: await, sonst bleibt gerne mal ein Backdrop hängen
    await this.modalCtrl.dismiss({ accepted }, 'dsgvo');
  }
}
