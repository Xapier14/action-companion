import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLeaveGuard } from 'src/app/services/guards/can-leave-guard.service';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage,
    canDeactivate: [CanLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
