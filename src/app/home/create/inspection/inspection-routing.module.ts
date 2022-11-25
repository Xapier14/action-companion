import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLeaveGuard } from 'src/app/services/guards/can-leave-guard.service';

import { InspectionPage } from './inspection.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionPage,
    canDeactivate: [CanLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPageRoutingModule {}
