import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from 'src/services/app-state.service';
import { Project } from 'src/models/project.model';
import { AdminService } from '../../admin.service';
import { RestService } from 'src/services/rest.service';
import { AppImage } from 'src/models/app-image.model';
import { ProjectCategory } from 'src/models/project-category.model';

import * as moment from 'moment'
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
          public stateService: AppStateService,
          public adminS: AdminService,
          public appState: AppStateService,
          public route: ActivatedRoute,
          public router: Router
     ) { }

     ngOnInit() {
          this.route.params.subscribe(params => {

              let project_id: number = parseInt(params['project_id'])
              if(!project_id) this.router.navigate(['/admin'])

              let project: Project = this.stateService.state.projects.find(p=>p.id===project_id)
              if(!project) this.router.navigate(['/admin'])

              this.project_edit = JSON.parse(JSON.stringify(project))

              this.project_completion_time_edit = this.project_edit.completion_time?new Date(this.project_edit.completion_time):null
          })
     }

     ngAfterViewInit() {
     }

     save_project_changes() {
          this.project_edit.completion_time = new Date(this.project_completion_time_edit).getTime()
          this.rest.update_project(this.project_edit, () => {
               this.appState.update_state(() => {
                    this.router.navigate(['/admin', 'projects'])
               })
          })
     }

     new_image_dialog_open() {
          this.new_image = new AppImage()
          this.new_image_dialog_visible = true
     }

     new_image_dialog_submit() {
          this.project_edit.images.push((this.new_image))
          this.new_image = null
          this.new_image_dialog_visible = false
     }

     make_image_first(image: AppImage) {
          let ind: number = this.project_edit.images.findIndex(i=>i.id===image.id)
          let im : AppImage = this.project_edit.images.splice(ind, 1)[0]
          this.project_edit.images.splice(0, 0, im)
     }


     delete_project_dialog_open() {
          this.delete_project_dialog_visible = true
     }

     delete_project_dialog_submit() {
          this.rest.delete_project(this.project_edit, (done) => {
               this.appState.update_state(() => {
                    this.delete_project_dialog_visible = false
                    this.router.navigate(['/admin','projects'])
               })
          })
     }

     new_project_category_dialog_open() {
          this.new_project_category = JSON.parse(JSON.stringify(this.appState.state.project_categories[0]))
          this.new_project_category_dialog_visible = true
     }

     new_project_category_dialog_submit() {
          this.new_project_category.id = this.appState.state.project_categories.find(c=>c.name===this.new_project_category.name).id
          let c = this.project_edit.project_categories.find(p=>p.name===this.new_project_category.name)
          if(!c) this.project_edit.project_categories.push(this.new_project_category)
          this.new_project_category = null
          this.new_project_category_dialog_visible = false
     }

     remove_category_from_project(category: ProjectCategory) {
          let ind = this.project_edit.project_categories.findIndex(c=>c.name===category.name)
          this.project_edit.project_categories.splice(ind, 1)
     }

     remove_image_from_project(image: AppImage) {
          let ind = this.project_edit.images.findIndex(i=>i.id===image.id)
          this.project_edit.images.splice(ind, 1)
     }
}