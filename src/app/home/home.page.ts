import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { BuildingsService } from '../services/buildings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private isCurrentView: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private buildingsService: BuildingsService,
    private platform: Platform
  ) {}

  async ngOnInit() {
    console.log('home init');
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
    try {
      const token = await Preferences.get({ key: 'token' });
      const result = await this.authService.checkToken(token.value, true);
      if (result.sessionState != 'validSession') {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  ionViewDidEnter() {
    this.isCurrentView = true;
    console.log('home page did enter');
  }

  ionViewWillLeave() {
    this.isCurrentView = false;
    console.log('home page did leave');
  }

  navigateToSettings() {
    this.router.navigate(['/home/settings']);
  }

  changeTo(tabControl) {
    this.router.navigate(['home', tabControl.getSelected()]);
  }

  gotoHomeFeed() {
    this.router.navigate(['/home/feed']);
  }
}
