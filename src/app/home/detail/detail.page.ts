import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { BuildingsService } from 'src/app/services/buildings.service';
import { IdentityCacheService } from 'src/app/services/identity-cache.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string;
  reportData = null;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private reportsService: ReportsService,
    private buildingsService: BuildingsService,
    private identityCacheService: IdentityCacheService
  ) {}

  async ngOnInit() {
    const errorAlert = await this.alertController.create({
      header: 'Error',
      message: 'Failed to fetch report data.',
      buttons: ['OK'],
    });
    const loadingModal = await this.loadingController.create({
      message: 'Fetching report data...',
    });
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.id = params.id;
      }
    });
    console.log(`Viewing report ${this.id}`);
    // populate fields
    loadingModal.present();
    let report = await this.reportsService.getReportAsync(this.id);
    loadingModal.dismiss();
    if (report === undefined) {
      this.navController.back();
      errorAlert.present();
      return;
    }
    report.building = this.buildingsService.getBuildingName(report.buildingId);
    if (report.building === 'Unknown') {
      await this.buildingsService.updateBuildingCache(report.location);
      report.building = this.buildingsService.getBuildingName(
        report.buildingId
      );
    }
    report.inspector = await this.identityCacheService.getNameFromIdAsync(
      report.inspectorId
    );
    this.reportData = report;
    console.log(report);
  }

  goBack() {
    this.navController.back();
  }

  async refreshData(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
