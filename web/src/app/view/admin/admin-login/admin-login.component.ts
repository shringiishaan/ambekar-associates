import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
     selector: 'admin-login',
     templateUrl: './admin-login.component.html',
     styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {

     @Output() login_validation_success: EventEmitter<boolean> = new EventEmitter<boolean>()

     username: string

     password: string

     constructor() { }

     ngOnInit() {
     }

     login_validate() {
          this.login_validation_success.emit(true)
     }
}