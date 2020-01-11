import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

declare var $: any

@Component({
     selector: 'projects-showcase',
     templateUrl: './projects-showcase.component.html',
     styleUrls: ['./projects-showcase.component.css']
})

export class ProjectsShowcaseComponent implements OnInit {

     active_project_category: string

     projects: Project[]

     constructor(
          public rest: RestService,
          public projectsService: ProjectsService
     ) { }

     ngOnInit() {
          this.loadProjects().catch(err=>console.error(err))
     }

     loadProjects(): Promise<void> {
          return new Promise((resolve, reject) => {
               this.projectsService.getAll().then((ps) => {
                    this.projects = ps
                    resolve()
               }).catch(err => reject(err))
          })
     }

     select_option(option: string) {
          if(option==='all') {

          }
          // $('.col-3').fadeOut(700, () => {
          //      $('.col-3').fadeIn(700)
          // })

          let target = $('.col-3')
          target.slideUp(700, () => {
               target.slideDown(700, () => {}) 
          }) 
     }

}
