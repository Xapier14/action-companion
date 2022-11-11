import { Component, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/services/buildings.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  reports: any[] = undefined;
  buildings: any[] = undefined;
  infScroll: any;
  building: any;

  constructor(private reportsService: ReportsService, private buildingsService: BuildingsService) { }

  sentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  numberToSeverity(num) {
    switch (num) {
      case 0:
        return "None";
      case 1:
        return "Minor";
      case 2:
        return "Moderate";
      case 3:
        return "Severe";
    }
    return "Unknown State";
  }

  numberToColor(num) {
    switch (num) {
      case 0:
        return "ok-color";
      case 1:
        return "minor-color";
      case 2:
        return "moderate-color";
      case 3:
        return "severe-color";
    }
    return "unknown-color";
  }

  async ngOnInit() {
    await this.buildingsService.updateBuildingCache("alangilan");
    this.buildings = this.buildingsService.getBuildingNameList();
    this.buildings.push("All");
    const response = await this.reportsService.getListDataAsync();
    this.reports = response.map((item) => {
      return {
        id: item.id,
        buildingName: item.buildingName,
        severity: this.numberToSeverity(item.severityStatus),
        color: this.numberToColor(item.severityStatus),
        location: this.sentenceCase(item.location),
        inspector: item.inspector,
        date: item.inspectedDateTime
      };
    });
  }

  loadData(event) {
    this.infScroll = event.target;
    if (!this.reportsService.hasMoreData()) {
      event.target.disabled = true;
      return;
    }
    setTimeout(async () => {
      const response = await this.reportsService.getListDataAsync();
      this.reports.push(...response.map((item) => {
        return {
          id: item.id,
          buildingName: item.buildingName,
          severity: this.numberToSeverity(item.severityStatus),
          color: this.numberToColor(item.severityStatus),
          location: this.sentenceCase(item.location),
          inspector: item.inspector,
          date: item.inspectedDateTime
        };
      }));
      event.target.complete();
    }, 500);
  }

  refreshData(event) {
    setTimeout(async () => {
      this.reportsService.refreshList();
      if (this.infScroll) {
        this.infScroll.disabled = false;
      }
      const response = await this.reportsService.getListDataAsync();
      this.reports = response.map((item) => {
        return {
          buildingName: item.buildingName,
          severity: this.numberToSeverity(item.severityStatus),
          color: this.numberToColor(item.severityStatus),
          location: this.sentenceCase(item.location),
          inspector: item.inspector,
          date: item.inspectedDateTime
        };
      });
      event.target.complete();
    }, 500);
  }

  buildingChange() {
    console.log("sd");
  }
}
