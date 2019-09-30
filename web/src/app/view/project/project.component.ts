import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { RestService } from 'src/app/rest.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
     selector: 'project',
     templateUrl: './project.component.html',
     styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

     project: Project

     constructor(
          public route: ActivatedRoute,
          public rest: RestService,
          public projectsService: ProjectsService
     ) { }

     ngOnInit() {
          this.route.params.subscribe((params) => {
               this.project = null
               let projectId: number = parseInt(params['projectId'])
               if(Number.isInteger(projectId)) {
                    this.projectsService.getOne(projectId).then((project: Project) => {
                         this.project = this.project   
                    }).catch(err => console.error(err))
               }
          })
     }
}