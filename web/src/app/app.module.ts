import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './view/home/home.component';
import { AdminLoginComponent } from './view/admin/admin-login/admin-login.component';
import { TopNavbarComponent } from './view/top-navbar/top-navbar.component';
import { HomeServicesComponent } from './view/home/home-services/home-services.component';
import { SubHeaderComponent } from './view/sub-header/sub-header.component';
import { SubNavbarComponent } from './view/sub-navbar/sub-navbar.component';
import { CarouselComponent } from './view/home/carousel/carousel.component';
import { CarouselItemComponent } from './view/home/carousel/carousel-item/carousel-item.component';

@NgModule({

    declarations: [
        AppComponent,
        HomeComponent,
        AdminLoginComponent,
        TopNavbarComponent,
        HomeServicesComponent,
        SubHeaderComponent,
        SubNavbarComponent,
        CarouselComponent,
        CarouselItemComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        AppRoutingModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})

export class AppModule { }