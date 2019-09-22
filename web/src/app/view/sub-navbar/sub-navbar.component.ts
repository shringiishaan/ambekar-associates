import { Component, OnInit, Input } from '@angular/core';

@Component({
     selector: 'sub-navbar',
     templateUrl: './sub-navbar.component.html',
     styleUrls: ['./sub-navbar.component.css']
})

export class SubNavbarComponent implements OnInit {

     @Input() active_tab: string = null

     constructor() { }

     ngOnInit() {
     }

}
