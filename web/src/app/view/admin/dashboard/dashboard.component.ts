import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

declare var $: any

@Component({
     selector: 'dashboard',
     templateUrl: './dashboard.component.html',
     styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

     constructor(
          public adminS: AdminService
     ) { }

     ngOnInit() { 
     }

     ngAfterViewInit() {
     }
}
