import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { DetailPage } from './detail/detail.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('./feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
