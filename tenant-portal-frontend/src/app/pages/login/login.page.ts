import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { DsgvoModalComponent } from '../../shared/dsgvo-modal/dsgvo-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class LoginPage {
  username = '';
  password = '';
  showPw = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async openDsgvo() {
    const modal = await this.modalCtrl.create({
      component: DsgvoModalComponent,
      backdropDismiss: false,
      cssClass: 'dsgvo-modal-wide',
    });
    await modal.present();
  }

  async login() {
    await this.router.navigateByUrl('/tabs/dashboards', { replaceUrl: true });
  }
}
