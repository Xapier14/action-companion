import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // check if token exists
    Preferences.get({ key: 'token' })
    .then((token) => {
      this.authService.checkToken(token.value, true).then((result) => {
        if (result.sessionState != "validSession") {
          this.router.navigate(['/login']);
        }
      });
    })
    .catch(() => {
      this.router.navigate(['/login']);
    })
  }
}
