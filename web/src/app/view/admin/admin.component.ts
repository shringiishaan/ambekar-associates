import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any

@Component({
     selector: 'admin',
     templateUrl: './admin.component.html',
     styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

     constructor(
          public adminS: AdminService,
          public route: ActivatedRoute
     ) { }

     ngOnInit() {
          this.route.params.subscribe(params => {
              let current_page: string = params['page']
              this.adminS.current_page = current_page
          })
     }
     
     login_validation_success(val: boolean) {
          this.adminS.login = true
     }
}
