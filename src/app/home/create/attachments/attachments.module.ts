import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentsPageRoutingModule } from './attachments-routing.module';

import { AttachmentsPage } from './attachments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachmentsPageRoutingModule
  ],
  declarations: [AttachmentsPage]
})
export class AttachmentsPageModule {}
