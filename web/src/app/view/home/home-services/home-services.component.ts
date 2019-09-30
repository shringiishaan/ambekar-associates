import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
     selector: 'home-services',
     templateUrl: './home-services.component.html',
     styleUrls: ['./home-services.component.css']
})

export class HomeServicesComponent implements OnInit {

     services: Service[] = []

     constructor(
          public rest: RestService,
          public servicesService: ServicesService
     ) { }

     ngOnInit() {
          this.servicesService.getAll().then(services => this.services = services)
          .catch(err => console.error(err))
     }

}
