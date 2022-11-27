import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('./feed/feed.module').then((m) => m.FeedPageModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsPageModule),
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'create',
    children: [
      {
        path: '',
        redirectTo: 'inspection',
        pathMatch: 'full',
      },
      {
        path: 'inspection',
        loadChildren: () =>
          import('./create/inspection/inspection.module').then(
            (m) => m.InspectionPageModule
          ),
      },
      {
        path: 'evaluation',
        loadChildren: () =>
          import('./create/evaluation/evaluation.module').then(
            (m) => m.EvaluationPageModule
          ),
      },
      {
        path: 'posting',
        loadChildren: () =>
          import('./create/posting/posting.module').then(
            (m) => m.PostingPageModule
          ),
      },
      {
        path: 'actions',
        loadChildren: () =>
          import('./create/further-actions/further-actions.module').then(
            (m) => m.FurtherActionsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
