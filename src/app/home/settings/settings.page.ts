import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private router: Router,
    private navController: NavController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('init settings page');
  }

  ionViewDidLeave() {
    console.log('left settings page');
  }

  goBack() {
    this.navController.back();
  }

  async handleLogout() {
    const loadingModal = await this.loadingController.create({
      message: 'Logging out...',
    });
    loadingModal.present();
    await this.authService.logout();
    this.router.navigate(['/login']);
    loadingModal.dismiss();
  }
}
