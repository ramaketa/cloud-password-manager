import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./common/guards/auth.guard";
import {LoginComponent} from "./components/general/login/login.component";
import {RegisterComponent} from "./components/general/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: 'lk', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegisterComponent},
  { path: 'lk', canActivate: [AuthGuard],
    loadChildren: () => import('./components/general/lk/lk.module').then(m => m.LkModule)  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
