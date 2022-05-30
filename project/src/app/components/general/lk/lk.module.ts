import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LkComponent } from './lk.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RouterModule} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import { OverviewComponent } from './overview/overview.component';
import {LkRoutingModule} from "./lk-routing.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzResultModule} from "ng-zorro-antd/result";



@NgModule({
  declarations: [
    LkComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    LkRoutingModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzGridModule,
    NzTypographyModule,
    NzStatisticModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzResultModule,
  ]
})
export class LkModule { }
