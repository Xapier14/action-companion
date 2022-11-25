import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { CanLeaveGuard } from 'src/app/services/guards/can-leave-guard.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailPageRoutingModule],
  declarations: [DetailPage],
  providers: [CanLeaveGuard],
})
export class DetailPageModule {}
