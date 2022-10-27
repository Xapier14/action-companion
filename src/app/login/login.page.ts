import { Component } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  private phoneNumberInput : any;
  private passwordInput : any;
  private loginForm : FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
    ) {
    this.loginForm = formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?:09|\+639)\d{9}$/)
      ])],
      password: ['', Validators.required]
    })
  }
  async submitLogin() {
    const phoneNumber = this.loginForm.get("phoneNumber").value ?? "";
    const password = this.loginForm.get("password").value ?? "";
    console.log(`phoneNumber is ${phoneNumber}, password is ${password}`);
    const alert = await this.alertController.create({
      header: 'Hey!',
      message: 'Login is not yet implemented.',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(["home"]);
  }
}
