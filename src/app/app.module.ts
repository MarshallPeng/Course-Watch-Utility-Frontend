import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule} from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NewRequestsComponent } from './main/new-requests/new-requests.component';
import { ROUTING } from './app.routing';
import { CurrentRequestsComponent } from './main/current-requests/current-requests.component';
import { HeaderComponent } from './header/header.component';
import { APIService } from './service/api-service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './service/interceptor';
import { MainComponent } from './main/main.component';
import { AlertComponent } from './common/component/alert/alert.component';
import {PaymentsComponent} from './main/new-requests/payments/payments.component';
import { LoginComponent } from './main/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstructionsComponent } from './main/current-requests/instructions/instructions.component';

const firebaseConfig = {
  apiKey: "SECRET",
  authDomain: "course-watch-utility-1d35d.firebaseapp.com",
  databaseURL: "https://course-watch-utility-1d35d.firebaseio.com",
  projectId: "course-watch-utility-1d35d",
  storageBucket: "course-watch-utility-1d35d.appspot.com",
  messagingSenderId: "SECRET",
  appId: "SECRET"
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    NewRequestsComponent,
    CurrentRequestsComponent,
    MainComponent,
    AlertComponent,
    PaymentsComponent,
    LoginComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    ClrFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ROUTING,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule, // auth
  ],
  providers: [APIService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
