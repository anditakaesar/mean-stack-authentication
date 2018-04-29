import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],

  providers: [ UserService, AuthGuardService ],

  bootstrap: [ AppComponent ]
})

export class AppModule { }
