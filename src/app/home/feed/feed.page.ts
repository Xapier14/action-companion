import { Component, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/services/buildings.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  buildingStatuses = null;
  lastUpdated = 'Never';

  constructor(private buildingsService: BuildingsService) {}

  async ngOnInit() {
    this.updateStatuses();
  }

  async refreshStatus() {
    this.buildingStatuses = null;
    this.updateStatuses();
  }

  async updateStatuses() {
    await this.buildingsService.getCurrentLocationAsync();
    await this.buildingsService.updateBuildingCacheAsync();
    let statuses = [];
    const ids = this.buildingsService.getBuildingIdList();
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let status = await this.buildingsService.getBuildingInfoAsync(id);
      status.lastInspection = status.lastInspection
        ? new Date(status.lastInspection).toLocaleString()
        : 'Never';
      statuses.push(status);
    }
    this.lastUpdated = new Date().toLocaleString();
    this.buildingStatuses = statuses;
  }

  async statusClick(id) {
    console.log(id);
  }
}
