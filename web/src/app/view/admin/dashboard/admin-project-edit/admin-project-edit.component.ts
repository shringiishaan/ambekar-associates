import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

import * as moment from 'moment'
import { Project } from 'src/app/models/project.model';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { AppImage } from 'src/app/models/app-image.model';
import { RestService } from 'src/app/rest.service';
import { ProjectsService } from 'src/app/services/projects.service';

declare var $:any

@Component({
     selector: 'admin-project-edit',
     templateUrl: './admin-project-edit.component.html',
     styleUrls: ['./admin-project-edit.component.css']
})

export class AdminProjectEditComponent implements OnInit {

     project_edit: Project

     project_completion_time_edit: Date

     new_project_category: ProjectCategory

     new_project_category_dialog_visible: boolean = false

     delete_project_dialog_visible: boolean = false

     new_image_dialog_visible: boolean = false

     new_image: AppImage

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public route: ActivatedRoute,
          public router: Router,
          public projectsService: ProjectsService
     ) { }

     ngOnInit() {
          this.route.params.subscribe(params => {

              let projectId: number = parseInt(params['projectId'])
               if(!Number.isInteger(projectId)) {
                    this.router.navigate(['/admin'])
               }
               else {
                    this.projectsService.getOne(projectId).then((project: Project) => {
                         this.project_edit = project
                         this.project_completion_time_edit = this.project_edit.completionTime?new Date(this.project_edit.completionTime):null
                    })
               }

          })
     }

     ngAfterViewInit() {
     }

     save_project_changes() {
          this.project_edit.completionTime = new Date(this.project_completion_time_edit).getTime()
          this.projectsService.update(this.project_edit).then(() => {
               this.router.navigate(['/admin', 'projects'])
          })
     }

     new_image_dialog_open() {
          this.new_image = new AppImage()
          this.new_image_dialog_visible = true
     }

     new_image_dialog_submit() {
          let maxP: number = 0
          this.project_edit.imageIds.forEach(i=>maxP=(i.priority>maxP)?(i.priority+1):maxP)
          this.project_edit.imageIds.push({
               priority:maxP,
               id:this.new_image.id
          })
          this.new_image = null
          this.new_image_dialog_visible = false
     }

     make_image_first(image: AppImage) {
          let ind: number = this.project_edit.imageIds.findIndex(i=>i.id===image.id)
          let im : any = this.project_edit.imageIds.splice(ind, 1)[0]
          this.project_edit.imageIds.splice(0, 0, im)
     }


     delete_project_dialog_open() {
          this.delete_project_dialog_visible = true
     }

     delete_project_dialog_submit() {
          this.projectsService.delete(this.project_edit.id).then(() => {
               this.delete_project_dialog_visible = false
               this.router.navigate(['/admin','projects'])
          })
     }

     new_project_category_dialog_open() {
          this.new_project_category = JSON.parse(JSON.stringify({}))
          this.new_project_category_dialog_visible = true
     }

     new_project_category_dialog_submit() {
          // this.new_project_category.id = this.appState.state.project_categories.find(c=>c.name===this.new_project_category.name).id
          // let c = this.project_edit.project_categories.find(p=>p.name===this.new_project_category.name)
          // if(!c) this.project_edit.project_categories.push(this.new_project_category)
          this.new_project_category = null
          this.new_project_category_dialog_visible = false
     }

     remove_category_from_project(category: ProjectCategory) {
          // let ind = this.project_edit.project_categories.findIndex(c=>c.name===category.name)
          // this.project_edit.project_categories.splice(ind, 1)
     }

     remove_image_from_project(image: AppImage) {
          let ind = this.project_edit.imageIds.findIndex(i=>i.id===image.id)
          this.project_edit.imageIds.splice(ind, 1)
     }
}