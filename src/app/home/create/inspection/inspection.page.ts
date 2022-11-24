import { Component, OnInit } from '@angular/core';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.page.html',
  styleUrls: ['./inspection.page.scss'],
})
export class InspectionPage implements OnInit {
  constructor(private createReportService: CreateReportService) {}

  ngOnInit() {
    this.createReportService.clearFormData();
  }
}
