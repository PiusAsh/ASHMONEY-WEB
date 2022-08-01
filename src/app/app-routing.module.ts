import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'user', component: UserDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
