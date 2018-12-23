import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsDeprecatedModule } from '@clr/angular';
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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    NewRequestsComponent,
    CurrentRequestsComponent,
    MainComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    ClrFormsDeprecatedModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ROUTING
  ],
  providers: [APIService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
