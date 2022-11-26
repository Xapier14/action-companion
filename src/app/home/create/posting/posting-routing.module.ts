import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostingPage } from './posting.page';

const routes: Routes = [
  {
    path: '',
    component: PostingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingPageRoutingModule {}
