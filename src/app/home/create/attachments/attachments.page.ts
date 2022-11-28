import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.page.html',
  styleUrls: ['./attachments.page.scss'],
})
export class AttachmentsPage implements OnInit {

  constructor(
    private createReportService: CreateReportService,
    private navController: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  async goNext() {
    this.updateChanges();
    this.navController.navigateForward('/home/create/confirm', { animated: false });
  }

  updateChanges() {
  }
}
