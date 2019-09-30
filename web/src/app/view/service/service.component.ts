import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
     selector: 'service',
     templateUrl: './service.component.html',
     styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {

     service: Service

     constructor(
          public route: ActivatedRoute,
          public servicesService: ServicesService
     ) { }

     ngOnInit() {
          this.route.params.subscribe((params) => {
               this.service = null
               let serviceId: number = parseInt(params['serviceId'])
               if(Number.isInteger(serviceId)) {
                    this.servicesService.getOne(serviceId).then((service: Service) => {
                         this.service = service   
                    }).catch(err => console.error(err))
               }
          })
     }

}
