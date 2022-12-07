import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { CreditTransactionComponent } from './Components/credit-transaction/credit-transaction.component';
import { DebitTransactionComponent } from './Components/debit-transaction/debit-transaction.component';
import { HomeComponent } from './Components/home/home.component';
import { LoanPageComponent } from './Components/loan-page/loan-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ReceiveMoneyComponent } from './Components/receive-money/receive-money.component';
import { RegisterComponent } from './Components/register/register.component';
import { RegistrationSuccessComponent } from './Components/registration-success/registration-success.component';
import { SendMoneyComponent } from './Components/send-money/send-money.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { LoanCollectionComponent } from './loan-collection/loan-collection.component';

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
  {
    path:'admin', component: AdminDashboardComponent
  },
  {
    path:'send-money', component: SendMoneyComponent
  },
  {
    path:'loan', component: LoanCollectionComponent
  },
  {
    path:'receive-money', component: ReceiveMoneyComponent
  },
  {
    path:'profile', component: UserProfileComponent
  },
  {
    path:'credit', component: CreditTransactionComponent
  },
  {
    path:'debit', component: DebitTransactionComponent
  },
  {
    path:'success', component: RegistrationSuccessComponent
  },
  {
    path:'testing', component: LoanPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
