import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  private loginEndpoint = environment.apiHost + "/login";
  private checkEndpoint = environment.apiHost + "/check";

  private loginForm : FormGroup;
  private oldToken? : string;

  public isButtonDisabled : boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService
    ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.alertController.create({
      header: 'Welcome Back!',
      message: 'Your previous session was successfully resumed.',
      buttons: ['OK']
    })
    .then((alert) => {
      // check if token exists
      // resume session if token exists and redirect to home page
      this.authService.checkTokenFromPreferences(true).then((result) => {
        if (result.sessionState == "validSession") {
          alert.present();
          this.router.navigate(['/home']);
        }
      });
    });
  }

  async submitLogin() {
    // set button to disabled
    this.isButtonDisabled = true;
    
    const email = this.loginForm.get("email").value ?? "";
    const password = this.loginForm.get("password").value ?? "";
    
    // alerts
    const errorLogin = await this.alertController.create({
      header: 'Error',
      message: 'There was an error logging in. Please try again.',
      buttons: ['OK']
    });
    const wrongCredentails = await this.alertController.create({
      header: 'Error',
      message: 'Wrong email or password. Please try again.',
      buttons: ['OK']
    });
    const tooManyAttempts = await this.alertController.create({
      header: 'Error',
      message: 'Too many requests. Please try again later.',
      buttons: ['OK']
    });

    // send login request
    this.authService.tryLogin(email, password)
    .then(async (result) => {
      this.isButtonDisabled = false;
      if (result.e == 8) {
        await tooManyAttempts.present();
      } else if (result.e != 0) {
        await wrongCredentails.present();
      } else {
        this.router.navigate(['/home']);
      }
    })
    .catch(async (error) => {
      // general error
      this.isButtonDisabled = false;
      await errorLogin.present();
      console.log(error);
    });
  }
}
