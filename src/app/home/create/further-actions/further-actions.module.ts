import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FurtherActionsPageRoutingModule } from './further-actions-routing.module';

import { FurtherActionsPage } from './further-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FurtherActionsPageRoutingModule
  ],
  declarations: [FurtherActionsPage]
})
export class FurtherActionsPageModule {}
