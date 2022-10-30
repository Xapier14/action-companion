import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

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
    private alertController: AlertController
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
    // check if token exists
    // resume session if token exists and redirect to home page via checkToken()
    Preferences.get({ key: 'token' }).then((result) => {
      this.oldToken = result.value;
      this.checkToken();
    });
  }

  async checkToken() {
    const token = this.oldToken;
    if (token == null) return;
    const response = await (await fetch(this.checkEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })).json();
    if (response.sessionState == "validSession") {
      this.router.navigate(['/home']);
    } else {
      await Preferences.remove({ key: 'token' });
    }
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
    fetch(this.loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'email': email,
        'password': password,
        'grant_type': 'password'
      })
    })
    .then(response => response.json())
    .then(async (result) => {
      if (result.e == 8) {
        // too many attempts
        this.isButtonDisabled = false;
        await tooManyAttempts.present();
      } else if (result.e != 0) {
        // bad login
        this.isButtonDisabled = false;
        await wrongCredentails.present();
      } else {
        // good login
        await Preferences.set({ key: 'token', value: result.token });
        this.isButtonDisabled = false;
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
