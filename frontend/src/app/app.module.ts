import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { TokenInseptorsService } from './todo/inseptors/token-inseptors.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
     HomeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MatDialogModule,
    HttpClientModule, NgxSmartModalModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInseptorsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
