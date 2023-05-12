import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentPage } from './attachment.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmentPageRoutingModule {}
