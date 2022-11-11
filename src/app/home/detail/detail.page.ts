import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private id: string;

  constructor(private route: ActivatedRoute, private navController: NavController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id;
      }
    });
    console.log(`Viewing report ${this.id}`);
    // populate fields
  }

  goBack() {
    this.navController.back();
  }
}
