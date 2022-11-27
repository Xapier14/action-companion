import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FurtherActionsPage } from './further-actions.page';

const routes: Routes = [
  {
    path: '',
    component: FurtherActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FurtherActionsPageRoutingModule {}
