import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStateService } from 'src/services/app-state.service';
import { RestService } from 'src/services/rest.service';

@Component({
     selector: 'project',
     templateUrl: './project.component.html',
     styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

     project: Project

     constructor(
          public appState: AppStateService,
          public route: ActivatedRoute,
          public rest: RestService
     ) { }

     ngOnInit() { 
          this.route.params.subscribe((params) => {
               let project_id: number = parseInt(params['project_id'])
               this.project = this.appState.state.projects.find(p=>p.id===project_id)
          })
     }
}