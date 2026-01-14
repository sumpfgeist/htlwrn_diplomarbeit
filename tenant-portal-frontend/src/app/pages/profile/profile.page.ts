import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class ProfilePage {
  name = 'Max Mustermann';
  email = 'max.mustermann@gmail.com';
  lang: 'de' | 'en' = 'de';

  save() {
    console.log('save', { name: this.name, email: this.email, lang: this.lang });
  }
}
