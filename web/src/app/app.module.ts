import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

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
import { ProjectsShowcaseComponent } from './view/projects-showcase/projects-showcase.component';
import { AdminComponent } from './view/admin/admin.component';
import { DashboardComponent } from './view/admin/dashboard/dashboard.component';
import { AdminProjectsComponent } from './view/admin/dashboard/admin-projects/admin-projects.component';
import { AdminServicesComponent } from './view/admin/dashboard/admin-services/admin-services.component';
import { AdminProjectCategoriesComponent } from './view/admin/dashboard/admin-project-categories/admin-project-categories.component';
import { AdminCarouselComponent } from './view/admin/dashboard/admin-carousel/admin-carousel.component';
import { AdminGalleryComponent } from './view/admin/dashboard/admin-gallery/admin-gallery.component';
import { AdminClientsComponent } from './view/admin/dashboard/admin-clients/admin-clients.component';
import { AdminNavbarComponent } from './view/admin/admin-navbar/admin-navbar.component';
import { AdminLgMenuComponent } from './view/admin/admin-lg-menu/admin-lg-menu.component';
import { AdminProjectEditComponent } from './view/admin/dashboard/admin-project-edit/admin-project-edit.component';
import { AdminServiceEditComponent } from './view/admin/dashboard/admin-service-edit/admin-service-edit.component';

@NgModule({

    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        AdminLoginComponent,
        TopNavbarComponent,
        HomeServicesComponent,
        SubHeaderComponent,
        SubNavbarComponent,
        CarouselComponent,
        CarouselItemComponent,
        ProjectsShowcaseComponent,
        DashboardComponent,
        AdminProjectsComponent,
        AdminServicesComponent,
        AdminProjectCategoriesComponent,
        AdminCarouselComponent,
        AdminGalleryComponent,
        AdminClientsComponent,
        AdminNavbarComponent,
        AdminLgMenuComponent,
        AdminProjectEditComponent,
        AdminServiceEditComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        AppRoutingModule,
        DialogModule,
        CalendarModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})

export class AppModule { }