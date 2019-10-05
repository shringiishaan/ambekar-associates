import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Project } from 'src/app/models/project.model';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { AppImage } from 'src/app/models/app-image.model';
import { RestService } from 'src/app/rest.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectCategoriesService } from 'src/app/services/project-categories.service';

declare var $:any

@Component({
     selector: 'admin-project-edit',
     templateUrl: './admin-project-edit.component.html',
     styleUrls: ['./admin-project-edit.component.css']
})

export class AdminProjectEditComponent implements OnInit {

     projectCategories: ProjectCategory[] = []

     project: Project

     project_completion_time_edit: Date

     delete_project_dialog_visible: boolean = false

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public route: ActivatedRoute,
          public router: Router,
          public projectsService: ProjectsService,
          public projectCategroiesService: ProjectCategoriesService
     ) { }

     ngOnInit() {
          this.projectCategroiesService.getAll().then(cats => this.projectCategories = cats)
          .catch(err=>console.error(err))
          this.route.params.subscribe(params => {
              let projectId: number = parseInt(params['projectId'])
               if(!Number.isInteger(projectId)) {
                    this.router.navigate(['/admin'])
               }
               else {
                    this.projectsService.getOne(projectId).then((project: Project) => {
                         this.project = project
                         this.project_completion_time_edit = this.project.completionTime?new Date(this.project.completionTime):null
                    }).catch(err=>console.error(err))
               }
          })
     }

     ngAfterViewInit() {
     }

     save_project_changes() {
          this.project.completionTime = new Date(this.project_completion_time_edit).getTime()
          this.projectsService.update(this.project).then(() => {
               this.router.navigate(['/admin', 'projects'])
          })
     }

     delete_project_dialog_open() {
          this.delete_project_dialog_visible = true
     }

     delete_project_dialog_submit() {
          this.projectsService.delete(this.project.id).then(() => {
               this.delete_project_dialog_visible = false
               this.router.navigate(['/admin','projects'])
          })
     }
}