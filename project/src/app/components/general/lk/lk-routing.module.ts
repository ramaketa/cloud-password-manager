import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LkComponent} from "./lk.component";
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  {
    path: '',
    component: LkComponent,

    children: [
      {
        path: '',
        redirectTo: 'manage/create'
      },
      {
        path: 'manage',
        component: OverviewComponent
      },
      {
        path: 'manage/:id',
        component: OverviewComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LkRoutingModule { }
