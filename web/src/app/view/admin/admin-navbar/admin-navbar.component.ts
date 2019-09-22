import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

declare var $: any

@Component({
     selector: 'admin-navbar',
     templateUrl: './admin-navbar.component.html',
     styleUrls: ['./admin-navbar.component.css']
})

export class AdminNavbarComponent implements OnInit {

     constructor(
          public adminS: AdminService,
          public router: Router
     ) { }

     ngOnInit() {
     }

     ngAfterViewInit() {
          setTimeout(() => {
               this.adminS.dashboard_container_style['padding-top'] = ($('#admin-navbar').height()) + 30 +'px'
          })
     }

     admin_logout() {
          this.adminS.login = false
          this.router.navigate(['/'])
     }
}
