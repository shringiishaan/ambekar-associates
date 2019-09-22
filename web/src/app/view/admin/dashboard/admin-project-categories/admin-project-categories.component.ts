import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { AppStateService } from 'src/services/app-state.service';
import { RestService } from 'src/services/rest.service';
import { ProjectCategory } from 'src/models/project-category.model';

@Component({
     selector: 'admin-project-categories',
     templateUrl: './admin-project-categories.component.html',
     styleUrls: ['./admin-project-categories.component.css']
})

export class AdminProjectCategoriesComponent implements OnInit {


     new_category_dialog_visible: boolean = false

     new_category_name: string = "New Category"


     edit_category_dialog_visible: boolean = false

     edit_project_category: ProjectCategory


     delete_category_dialog_visible: boolean = false

     delete_project_category: ProjectCategory

     constructor(
          public adminS: AdminService,
          public appState: AppStateService,
          public rest: RestService
     ) { }

     ngOnInit() { }



     new_categroy_btn() {
          this.new_category_dialog_visible = true
     }

     new_category_submit() {
          let category: ProjectCategory = new ProjectCategory()
          category.name = this.new_category_name
          this.rest.new_project_category(category, (new_id: number) => {
               this.appState.update_state(() => {
                    this.new_category_dialog_visible = false
               })
          })
     }



     delete_project_category_trigger(project_category) {
          this.delete_project_category = project_category
          this.delete_category_dialog_visible = true
     }

     delete_project_category_confirm() {
          this.rest.delete_project_category(this.delete_project_category, () => {
               this.appState.update_state(() => {
                    this.delete_category_dialog_visible = false
               })
          })
     }



     edit_project_category_trigger(project_category) {
          this.edit_project_category = JSON.parse(JSON.stringify(project_category))
          this.edit_category_dialog_visible = true
     }

     edit_project_category_confirm() {
          this.rest.update_project_category(this.edit_project_category, () => {
               this.appState.update_state(() => {
                    this.edit_category_dialog_visible = false
               })
          })
     }
}
