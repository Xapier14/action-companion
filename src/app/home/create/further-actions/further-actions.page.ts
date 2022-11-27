import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-further-actions',
  templateUrl: './further-actions.page.html',
  styleUrls: ['./further-actions.page.scss'],
})
export class FurtherActionsPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}

  async goNext() {}

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  updateChanges() {}
}
