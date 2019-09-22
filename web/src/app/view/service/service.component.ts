import { Component, OnInit } from '@angular/core';
import { Service } from 'src/models/service.model';
import { AppStateService } from 'src/services/app-state.service';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/services/rest.service';

@Component({
     selector: 'service',
     templateUrl: './service.component.html',
     styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {

     service: Service

     constructor(
          public appState: AppStateService,
          public route: ActivatedRoute,
          public rest: RestService
     ) { }

     ngOnInit() {
          this.route.params.subscribe((params) => {
               let service_id: number = parseInt(params['service_id'])
               this.service = this.appState.state.services.find(s=>s.id===service_id)
          })
     }

}
