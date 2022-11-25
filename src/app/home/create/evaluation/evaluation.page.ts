import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {
  constructor(
    private createReportService: CreateReportService,
    private navController: NavController
  ) {}

  ngOnInit() {}
  async goBack() {
    this.navController.back({ animated: false });
  }

  async goNext() {
    // this.router.navigateByUrl('/home/create/evaluation');
  }
}
