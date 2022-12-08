import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponent } from './HomePage/home/home.component';
import { AccountInfoComponent } from './userDashboard/account-info/account-info.component';
import { OverviewComponent } from './userDashboard/overview/overview.component';
import { ReceiveMoneyComponent } from './userDashboard/receive-money/receive-money.component';
import { SendMoneyComponent } from './userDashboard/send-money/send-money.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: OverviewComponent,
  },
  {
    path: 'admin',
    component: OverviewComponent,
  },
  {
    path: 'send-money',
    component: SendMoneyComponent,
  },
  // {
  //   path: 'loan',
  //   component: LoanCollectionComponent,
  // },
  {
    path: 'receive-money',
    component: ReceiveMoneyComponent,
  },
  {
    path: 'user-profile',
    component: AccountInfoComponent,
  },
  
  // {
  //   path: 'success',
  //   component: RegistrationSuccessComponent,
  // },
  // {
  //   path: 'testing',
  //   component: LoanPageComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
