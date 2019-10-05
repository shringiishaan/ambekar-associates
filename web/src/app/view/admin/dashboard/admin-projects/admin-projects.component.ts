import { Component, OnInit } from "@angular/core"
import { AdminService } from "../../admin.service"
import { RestService } from "src/app/rest.service"
import { Project } from "src/app/models/project.model"
import { ProjectsService } from "src/app/services/projects.service"

@Component({
     selector: "admin-projects",
     templateUrl: "./admin-projects.component.html",
     styleUrls: ["./admin-projects.component.css"]
})
export class AdminProjectsComponent implements OnInit {

     projects: Project[] = []

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public projectsService: ProjectsService
     ) { }

     ngOnInit() {
          this.loadProjects()
     }

     loadProjects() {
          return new Promise((resolve, reject) => {
               this.projectsService.getAll().then((projects:Project[]) => {
                    this.projects = projects
                    resolve()
               }).catch(err => reject(err))
          })
     }

     new_project_dialog_visible: boolean = false
     new_project: Project

     new_project_dialog_open() {
          this.new_project = new Project()
          this.new_project_dialog_visible = true
     }

     new_project_dialog_confirm() {
          this.projectsService.createNew(this.new_project).then(() => {
               this.loadProjects().then(() => {
                    this.new_project_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }


     delete_project_dialog_visible: boolean = false
     delete_project: Project

     delete_project_dialog_open(project) {
          this.delete_project = project
          this.delete_project_dialog_visible = true
     }

     delete_project_dialog_submit() {
          this.projectsService.delete(this.delete_project.id).then(() => {
               this.loadProjects().then(() => {
                    this.delete_project_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }
}
