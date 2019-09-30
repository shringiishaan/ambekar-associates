import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { Service } from "src/app/models/service.model";

@Component({
  selector: "admin-services",
  templateUrl: "./admin-services.component.html",
  styleUrls: ["./admin-services.component.css"]
})
export class AdminServicesComponent implements OnInit {

  constructor(
    public adminS: AdminService
  ) 
  {}
  
  new_service_dialog_visible: boolean = false

  new_service: Service

  ngOnInit() {}
  
  new_service_dialog_open() {
    this.new_service = new Service();
    this.new_service_dialog_visible = true;
  }

  // call to save service
  new_service_dialog_confirm() {
    // let servicelist: Service = this.appState.state._servicelist;
    // this.rest.new_service(servicelist, () => {
    this.new_service_dialog_visible = false;
    // });
  }
}
