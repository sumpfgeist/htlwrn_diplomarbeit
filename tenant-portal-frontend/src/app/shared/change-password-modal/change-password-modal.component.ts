import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
})
export class ChangePasswordModalComponent {
  form = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private toast: ToastController
  ) {}

  close() {
    this.modal.dismiss();
  }

  async submit() {
    if (!this.form.valid) {
      (await this.toast.create({ message: 'Bitte alle Felder ausfüllen.', duration: 1500 })).present();
      return;
    }

    const { newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      (await this.toast.create({ message: 'Passwörter stimmen nicht überein.', duration: 1500 })).present();
      return;
    }

    // TODO: API Call: change password (old -> new)
    this.modal.dismiss({ changed: true });
  }
}
