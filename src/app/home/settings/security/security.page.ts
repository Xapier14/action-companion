import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  isRememberLogin: boolean;

  constructor(
    private navController: NavController,
    private preferenceService: PreferenceService
  ) {
    this.preferenceService.getAsync('rememberLogin').then((val) => {
      this.isRememberLogin = val === 'true';
    });
  }

  ngOnInit() {}

  async toggleRememberLogin(event) {
    console.log(event);
    this.isRememberLogin = event.detail.checked;
    await this.preferenceService.setAsync(
      'rememberLogin',
      this.isRememberLogin ? 'true' : 'false'
    );
  }

  goBack() {
    this.navController.back();
  }
}
