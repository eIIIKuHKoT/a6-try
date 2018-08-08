import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

import { environment } from '../environments/environment'
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";
import {UsersService} from "./shared/services/users.service";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth-guard";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    AppComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    UsersService, AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
