import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({

    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFontAwesomeModule,
        AppRoutingModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})

export class AppModule { }