import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionPage } from './inspection.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPageRoutingModule {}
