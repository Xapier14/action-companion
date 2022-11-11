import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private isCurrentView: boolean;
  private displayWarning: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private platform: Platform,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // disable back button
    this.platform.backButton.subscribeWithPriority(
      9999,
      (processNextHandler) => {
        if (this.isCurrentView) {
        } else {
          processNextHandler();
        }
      }
    );
    // check if token exists
    Preferences.get({ key: 'token' })
      .then((token) => {
        this.authService.checkToken(token.value, true).then((result) => {
          if (result.sessionState != 'validSession') {
            this.router.navigate(['/login']);
          }
        });
      })
      .catch(() => {
        this.router.navigate(['/login']);
      });
  }

  ionViewDidEnter() {
    this.isCurrentView = true;
  }

  ionViewWillLeave() {
    this.isCurrentView = false;
  }

  async onLogout(modal) {
    const loadingModal = await this.loadingController.create({
      message: "Logging out..."
    })
    loadingModal.present();
    await this.authService.logout();
    this.router.navigate(['/login']);
    loadingModal.dismiss();
  }
}
