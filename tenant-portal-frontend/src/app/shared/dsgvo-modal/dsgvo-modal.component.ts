import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dsgvo-modal',
  standalone: true,
  templateUrl: './dsgvo-modal.component.html',
  styleUrls: ['./dsgvo-modal.component.scss'],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class DsgvoModalComponent {
  private modal = inject(ModalController);

  // accepted = true/false
  dismiss(accepted: boolean): void {
    this.modal.dismiss({ accepted });
  }
}
