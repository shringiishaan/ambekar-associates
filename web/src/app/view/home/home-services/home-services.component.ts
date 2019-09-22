import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/services/app-state.service';
import { RestService } from 'src/services/rest.service';

@Component({
     selector: 'home-services',
     templateUrl: './home-services.component.html',
     styleUrls: ['./home-services.component.css']
})

export class HomeServicesComponent implements OnInit {

     constructor(
          public stateService: AppStateService,
          public rest: RestService
     ) { }

     ngOnInit() {
     }

}
