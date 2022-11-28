import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentsPage } from './attachments.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmentsPageRoutingModule {}
