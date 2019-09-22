import { Component, OnInit, Input } from '@angular/core';

@Component({
     selector: 'admin-lg-menu',
     templateUrl: './admin-lg-menu.component.html',
     styleUrls: ['./admin-lg-menu.component.css']
})

export class AdminLgMenuComponent implements OnInit {

     @Input() active_tab: string

     constructor() { }

     ngOnInit() {
     }

}
