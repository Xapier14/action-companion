import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  versionNumber: string = 'n/a';
  packageName: string = 'web-build';
  constructor(
    private navController: NavController,
    private appVersion: AppVersion
  ) {
    this.appVersion.getVersionNumber().then((val) => {
      this.versionNumber = val;
    });
    this.appVersion.getPackageName().then((val) => {
      this.packageName = val;
    });
  }

  ngOnInit() {}

  goBack() {
    this.navController.back();
  }
}
