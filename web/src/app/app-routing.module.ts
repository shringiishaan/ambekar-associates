import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './view/home/home.component'
import { AdminLoginComponent } from './view/admin/admin-login/admin-login.component'
import { ProjectsShowcaseComponent } from './view/projects-showcase/projects-showcase.component'
import { AdminComponent } from './view/admin/admin.component'
import { AdminProjectEditComponent } from './view/admin/dashboard/admin-project-edit/admin-project-edit.component'
import { AdminServiceEditComponent } from './view/admin/dashboard/admin-service-edit/admin-service-edit.component'

const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },

    { path: 'projects', component: ProjectsShowcaseComponent },

    { path: 'login', component: AdminLoginComponent },

    { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },

    { path: 'admin/:page', component: AdminComponent },

    { path: 'admin/project/:projectId', component: AdminProjectEditComponent },

    { path: 'admin/service/:serviceId', component: AdminServiceEditComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }