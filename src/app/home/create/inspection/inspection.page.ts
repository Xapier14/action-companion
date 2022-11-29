import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BuildingsService } from 'src/app/services/buildings.service';
import { CreateReportService } from 'src/app/services/create-report.service';
import { IDeactivateComponent } from 'src/app/services/guards/can-leave-guard.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.page.html',
  styleUrls: ['./inspection.page.scss'],
})
export class InspectionPage implements OnInit {
  @ViewChild('buildingselect') buildingSelect;
  @ViewChild('areasradio') areasRadio;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private router: Router,
    private createReportService: CreateReportService,
    private buildingsService: BuildingsService,
    private authService: AuthService
  ) {}

  currentName: string = 'Unknown';
  currentLocation: string = 'Unknown';
  buildings: [string, string][] = undefined;

  async ngOnInit() {
    // get inspection information
    const token = await this.authService.checkTokenFromPreferences(true);
    if (token.sessionState != 'validSession')
      this.router.navigateByUrl('/login');
    this.currentName = token.name;
    this.currentLocation = token.location;

    // get available buildings
    await this.buildingsService.updateBuildingCacheAsync(this.currentLocation);
    this.buildings = [];
    this.buildingsService
      .getBuildingNameList(this.currentLocation)
      .forEach((building) => {
        const id = this.buildingsService.getBuildingId(
          building,
          this.currentLocation
        );
        this.buildings.push([id, building]);
      });

    // update view with data from service
    this.buildingSelect.value = this.createReportService.getBuildingId();
    this.areasRadio.value = this.createReportService.getAreasInspected();
    this.createReportService.setInspectorId(token.id);
    this.createReportService.setLocation(this.currentLocation);
  }

  async goBack() {
    this.createReportService.clearFormData();
    this.navController.back();
  }

  async goNext() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'One or more fields are missing or invalid.',
      buttons: ['OK'],
    });
    if (this.createReportService.getBuildingId() == undefined) {
      alert.message = 'Please select a building.';
      alert.present();
      return;
    }
    if (this.createReportService.getAreasInspected() == undefined) {
      alert.message = 'Please select an area option.';
      alert.present();
      return;
    }
    this.navController.navigateForward('/home/create/evaluation', {
      animated: false,
    });
  }

  buildingChange(event) {
    this.createReportService.setBuildingId(event.detail.value);
  }

  areasChange(event) {
    this.createReportService.setAreasInspected(event.detail.value);
  }
}
