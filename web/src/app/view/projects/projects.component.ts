import { Component, OnInit } from "@angular/core";
import { AppStateService } from "../../services/app-state.service";
import { RestService } from "src/services/rest.service";
import { Project } from "src/models/project.model";
import { Router } from "@angular/router";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  constructor(
    public rest: RestService,
    public appState: AppStateService,
    public router: Router
  ) {}

  ngOnInit() {}
}
