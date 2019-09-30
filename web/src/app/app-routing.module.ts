import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './view/home/home.component'
import { AdminLoginComponent } from './view/admin/admin-login/admin-login.component'

const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },

    { path: 'login', component: AdminLoginComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }