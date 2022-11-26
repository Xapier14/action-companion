import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { CreateReportService } from 'src/app/services/create-report.service'

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {
  constructor(
    private createReportService: CreateReportService,
    private navController: NavController,
  ) {}

  ngOnInit() {}

  async goBack() {
    this.updateChanges()
    this.navController.back({ animated: false })
  }

  updateChanges() {}
}
