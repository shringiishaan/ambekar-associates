import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { AppStateService } from "src/services/app-state.service";
import { Project } from "src/models/project.model";
import { RestService } from "src/services/rest.service";

@Component({
     selector: "admin-projects",
     templateUrl: "./admin-projects.component.html",
     styleUrls: ["./admin-projects.component.css"]
})
export class AdminProjectsComponent implements OnInit {
     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public appState: AppStateService
     ) { }

     ngOnInit() { }

     new_project_dialog_visible: boolean = false;
     new_project: Project;

     new_project_dialog_open() {
          this.new_project = new Project();
          this.new_project_dialog_visible = true;
     }

     new_project_dialog_confirm() {
          this.rest.new_project(this.new_project, () => {
               this.new_project_dialog_visible = false
          })
     }


     delete_project_dialog_visible: boolean = false;
     delete_project: Project;

     delete_project_dialog_open(project) {
          this.delete_project = project;
          this.delete_project_dialog_visible = true;
     }

     delete_project_dialog_submit() {
          this.rest.delete_project(this.delete_project, done => {
               this.appState.update_state(() => {
                    this.delete_project_dialog_visible = false;
               });
          });
     }
}
