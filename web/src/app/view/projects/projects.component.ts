import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestService } from "src/app/rest.service";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  constructor(
    public rest: RestService,
    public router: Router
  ) {}

  ngOnInit() {}
}
