import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormGroup, FormBuilder, ReactiveFormsModule, FormsModule} from "@angular/forms"
import { HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { SendMoneyComponent } from './Components/send-money/send-money.component';
import { LoanCollectionComponent } from './loan-collection/loan-collection.component';
import { LoanPageComponent } from './Components/loan-page/loan-page.component';
import { ReceiveMoneyComponent } from './Components/receive-money/receive-money.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { CreditTransactionComponent } from './Components/credit-transaction/credit-transaction.component';
import { DebitTransactionComponent } from './Components/debit-transaction/debit-transaction.component';
import { NgToastModule } from 'ng-angular-popup';
import { RegistrationSuccessComponent } from './Components/registration-success/registration-success.component';
import { AdminRegistrationComponent } from './Models/admin-registration/admin-registration.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    SendMoneyComponent,
    LoanCollectionComponent,
    LoanPageComponent,
    ReceiveMoneyComponent,
    UserProfileComponent,
    CreditTransactionComponent,
    DebitTransactionComponent,
    RegistrationSuccessComponent,
    AdminRegistrationComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
