import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionPageRoutingModule } from './inspection-routing.module';

import { InspectionPage } from './inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionPageRoutingModule
  ],
  declarations: [InspectionPage]
})
export class InspectionPageModule {}
