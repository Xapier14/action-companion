import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AttachmentsService } from 'src/app/services/attachments.service';
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
    private identityCacheService: IdentityCacheService,
    private attachmentsService: AttachmentsService
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
    if (report === undefined) {
      loadingModal.dismiss();
      this.navController.back();
      errorAlert.present();
      return;
    }
    report.building = this.buildingsService.getBuildingName(
      report.buildingId,
      report.location
    );
    report.buildingDamageString = (() => {
      switch (report.estimatedBuildingDamage) {
        case 0:
          return 'None';
        case 1:
          return '1 - 10 %';
        case 2:
          return '11 - 30 %';
        case 3:
          return '31 - 60 %';
        case 4:
          return '61 - 99 %';
        case 5:
          return '100 %';
        default:
          return 'Unknown';
      }
    })();
    if (report.building === 'Unknown') {
      await this.buildingsService.updateBuildingCacheAsync(report.location);
      report.building = this.buildingsService.getBuildingName(
        report.buildingId,
        report.location
      );
    }
    report.inspector = (
      await this.identityCacheService.getNameFromIdAsync(report.inspectorId)
    ).join(' ');
    report.attachments = await Promise.all(
      report.attachments.map(async (attachment) => {
        const full = await this.attachmentsService.GetAttachmentAsync(
          attachment,
          false
        );
        const thumbnail = await this.attachmentsService.GetAttachmentAsync(
          attachment,
          true
        );
        return {
          id: attachment,
          thumbnail: thumbnail,
          thumbnailUrl: await this.attachmentsService.GetAttachmentUrlAsync(
            thumbnail
          ),
          mediaType: full.contentType.split('/')[0],
        };
      })
    );
    loadingModal.dismiss();
    this.reportData = report;
  }

  goBack() {
    this.navController.back();
  }

  async refreshData(event) {
    await this.ngOnInit();
    event.target.complete();
  }

  async openAttachment(id) {
    this.navController.navigateForward(`home/detail/attachment?id=${id}`);
  }
}
