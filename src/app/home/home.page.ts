import { Component } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
      buttons: ['OK, fine']
    });
    await alert.present();
  }
}
