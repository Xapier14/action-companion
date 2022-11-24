import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePage,
    children: [
      {
        path: '',
        redirectTo: 'inspection',
        pathMatch: 'full',
      },
      {
        path: 'inspection',
        loadChildren: () =>
          import('./inspection/inspection.module').then(
            (m) => m.InspectionPageModule
          ),
      },
      {
        path: 'evaluation',
        loadChildren: () =>
          import('./evaluation/evaluation.module').then(
            (m) => m.EvaluationPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
