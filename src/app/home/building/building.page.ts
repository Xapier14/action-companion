import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BuildingsService } from 'src/app/services/buildings.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.page.html',
  styleUrls: ['./building.page.scss'],
})
export class BuildingPage implements OnInit {
  buildingData = null;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private router: Router,
    private buildingsService: BuildingsService,
    private reportService: ReportsService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      let buildingData =
        router.getCurrentNavigation().extras.state.buildingData;

      if (!buildingData) {
        this.goBack();
        return;
      }

      if (buildingData.lastInspection) {
        buildingData.lastStatusText = this.numberToSeverity(
          buildingData.lastStatus
        );
        buildingData.lastStatusColor = this.numberToColor(
          buildingData.lastStatus
        );
      }

      this.buildingData = buildingData;
    } else {
      this.goBack();
    }
  }

  numberToSeverity(num) {
    switch (num) {
      case 0:
        return 'OK';
      case 1:
        return 'Minor';
      case 2:
        return 'Moderate';
      case 3:
        return 'Severe';
    }
    return 'Unknown State';
  }

  numberToColor(num) {
    switch (num) {
      case 0:
        return 'ok-color';
      case 1:
        return 'minor-color';
      case 2:
        return 'moderate-color';
      case 3:
        return 'severe-color';
    }
    return 'unknown-color';
  }

  ngOnInit() {}

  goBack() {
    this.navController.back();
  }

  viewDetail(id) {
    this.router.navigate(['/home/detail'], {
      queryParams: {
        id: id,
      },
    });
  }

  async refreshData(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
