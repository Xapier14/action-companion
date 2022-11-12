import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private reportsService: ReportsService,
    private alertController: AlertController,
    private loadingController: LoadingController
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
    const report = await this.reportsService.getReportAsync(this.id);
    loadingModal.dismiss();
    console.log(report);
    if (report === undefined) {
      this.navController.back();
      errorAlert.present();
    }
  }

  goBack() {
    this.navController.back();
  }
}
