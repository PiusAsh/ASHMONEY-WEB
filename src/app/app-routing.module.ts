import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoanRequestComponent } from './Components/loan-request/loan-request.component';
import { HomeComponent } from './HomePage/home/home.component';
import { QuickLoanComponent } from './useDashboard/quick-loan/quick-loan.component';
import { AccountInfoComponent } from './userDashboard/account-info/account-info.component';
import { OverviewComponent } from './userDashboard/overview/overview.component';
import { ReceiveMoneyComponent } from './userDashboard/receive-money/receive-money.component';
import { SendMoneyComponent } from './userDashboard/send-money/send-money.component';
import { TransactionComponent } from './userDashboard/transaction/transaction.component';
import { UsersuccessPageComponent } from './usersuccess-page/usersuccess-page.component';

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
    path: 'user/:id',
    component: OverviewComponent,
  },
  {
    path: 'account-info/:id',
    component: AccountInfoComponent,
  },
  {
    path: 'transactions/:id',
    component: TransactionComponent,
  },
  {
    path: 'quick-loan/:id',
    component: LoanRequestComponent,
  },
  // {
  //   path: 'admin',
  //   component: OverviewComponent,
  // },
  {
    path: 'send-money/:id',
    component: SendMoneyComponent,
  },
  // {
  //   path: 'loan',
  //   component: LoanCollectionComponent,
  // },
  {
    path: 'receive-money/:id',
    component: ReceiveMoneyComponent,
  },
  {
    path: 'user-profile',
    component: AccountInfoComponent,
  },
  
  {
    path: 'success/:id',
    component: UsersuccessPageComponent,
  },
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
