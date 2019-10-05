import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { RestService } from 'src/app/rest.service';
import { ProjectCategoriesService } from 'src/app/services/project-categories.service';

@Component({
     selector: 'admin-project-categories',
     templateUrl: './admin-project-categories.component.html',
     styleUrls: ['./admin-project-categories.component.css']
})

export class AdminProjectCategoriesComponent implements OnInit {

     projectCategories: ProjectCategory[] = []

     constructor(
          public projectCategoriesService: ProjectCategoriesService,
          public adminS: AdminService,
          public rest: RestService
     ) { }

     ngOnInit() {
          this.reloadCategories()
     }

     reloadCategories() {
          return new Promise((resolve, reject) => {
               this.projectCategoriesService.getAll().then((categories:ProjectCategory[]) => {
                    this.projectCategories = categories
                    resolve()
               }).catch(err => reject(err))
          })
     }


     new_category_dialog_visible: boolean = false
     new_category_name: string

     new_categroy_btn() {
          this.new_category_name = null
          this.new_category_dialog_visible = true
     }

     new_category_submit() {
          let category: ProjectCategory = new ProjectCategory()
          category.name = this.new_category_name
          this.projectCategoriesService.createNew(category).then((new_id: number) => {
               this.reloadCategories().then(() => {
                    this.new_category_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }



     delete_category_dialog_visible: boolean = false
     delete_project_category: ProjectCategory

     delete_project_category_trigger(project_category) {
          this.delete_project_category = project_category
          this.delete_category_dialog_visible = true
     }

     delete_project_category_confirm() {
          this.projectCategoriesService.delete(this.delete_project_category.id).then(() => {
               this.reloadCategories().then(() => {
                    this.delete_category_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }



     edit_category_dialog_visible: boolean = false
     edit_project_category: ProjectCategory

     edit_project_category_trigger(project_category) {
          this.edit_project_category = JSON.parse(JSON.stringify(project_category))
          this.edit_category_dialog_visible = true
     }

     edit_project_category_confirm() {
          this.projectCategoriesService.update(this.edit_project_category).then(() => {
               this.reloadCategories().then(() => {
                    this.edit_category_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }
}
