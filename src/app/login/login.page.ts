import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Toast } from '@capacitor/toast';
import { environment } from 'src/environments/environment';

import { AuthService } from '../services/auth.service';
import { BuildingsService } from '../services/buildings.service';
import { PreferenceService } from '../services/preference.service';
import { RecaptchaService } from '../services/recaptcha.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private isCurrentView: Boolean;

  public isButtonDisabled: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private buildingsService: BuildingsService,
    private platform: Platform,
    private preferences: PreferenceService,
    private recaptcha: RecaptchaService
  ) {
    recaptcha.load();
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.recaptcha.showBadge();
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
    const loader = await this.loadingController.create({
      message: 'Checking login status...',
    });
    const alert = await this.alertController.create({
      header: 'Welcome Back!',
      message: 'Your previous session was successfully resumed.',
      buttons: ['OK'],
    });
    // check if resume session is enabled
    if (
      (await this.preferences.getAsync('rememberLogin')) === 'true' &&
      (await this.authService.hasStoredToken())
    ) {
      this.isButtonDisabled = true;
      loader.present();
      // resume session if token exists and redirect to home page
      const result = await this.authService.checkTokenFromPreferences(true);
      loader.dismiss();
      this.isButtonDisabled = false;
      if (result.sessionState == 'validSession') {
        alert.present();
        await this.buildingsService.setCurrentLocationAsync(result.location);
        this.router.navigate(['/home']);
      }
    }
  }

  async ngOnDestroy() {
    this.recaptcha.hideBadge();
  }

  ionViewDidEnter() {
    this.isCurrentView = true;
    this.recaptcha.showBadge();
  }

  ionViewWillLeave() {
    this.isCurrentView = false;
    this.recaptcha.hideBadge();
  }

  async submitLogin() {
    // set button to disabled
    this.isButtonDisabled = true;

    const email = this.loginForm.get('email').value ?? '';
    const password = this.loginForm.get('password').value ?? '';

    // alerts
    const errorLogin = await this.alertController.create({
      header: 'Error',
      message: 'There was an error logging in. Please try again.',
      buttons: ['OK'],
    });
    const wrongCredentials = await this.alertController.create({
      header: 'Error',
      message: 'Wrong email or password. Please try again.',
      buttons: ['OK'],
    });
    const accountLocked = await this.alertController.create({
      header: 'Error',
      message: 'Your account is locked. Please contact an administrator.',
      buttons: ['OK'],
    });
    const tooManyAttempts = await this.alertController.create({
      header: 'Error',
      message: 'Too many requests. Please try again later.',
      buttons: ['OK'],
    });

    // loading modal
    const loadingModal = await this.loadingController.create({
      message: 'Logging in...',
    });

    // send login request
    loadingModal.present();
    const token = await this.recaptcha.getToken('login');
    this.authService
      .tryLogin(email, password, token)
      .then(async (result) => {
        this.isButtonDisabled = false;
        loadingModal.dismiss();
        if (result.e == 8) {
          await tooManyAttempts.present();
        } else if (result.e == 400) {
          console.log('true error!');
          console.log(result);
          errorLogin.message = `There was an error logging in. Please try again.`;
          await Toast.show({
            text: `Error Code: ${result.e} - ${result.status ?? 'Unknown'}`,
          });
          await errorLogin.present();
        } else if (result.e == 19) {
          await accountLocked.present();
        } else if (result.e == 1) {
          await wrongCredentials.present();
        } else if (result.e == 11) {
          errorLogin.message = `There was an error communicating with the server. Please try again.`;
          await Toast.show({
            text: `Error Code: ${result.e} - ${result.status ?? 'Unknown'}`,
          });
          await errorLogin.present();
        } else if (result.e != 0) {
          console.log('generic error!');
          console.log(result);
          errorLogin.message = result.status;
          await Toast.show({
            text: `Error Code: ${result.e} - ${result.status ?? 'Unknown'}}`,
          });
          await errorLogin.present();
        } else {
          this.loginForm.setValue({ email: '', password: '' });
          await this.buildingsService.setCurrentLocationAsync(result.location);
          this.router.navigate(['/home']);
        }
      })
      .catch(async (error) => {
        loadingModal.dismiss();
        // general error
        this.isButtonDisabled = false;
        errorLogin.message = `A unknown error occurred while trying to log in. Please contact an administrator.`;
        await Toast.show({
          text: `${error}`,
        });
        await errorLogin.present();
        console.log('general error!');
        console.log(error);
      });
  }
}
