import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { Service } from "src/app/models/service.model";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "admin-services",
  templateUrl: "./admin-services.component.html",
  styleUrls: ["./admin-services.component.css"]
})

export class AdminServicesComponent implements OnInit {

  services: Service[] = []

  constructor(
    public adminS: AdminService,
    public servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.loadServices()
  }

  loadServices(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.servicesService.getAll().then((services: Service[]) => {
        this.services = services
        resolve()
      }).catch(err => reject(err))
    })
  }


  incrementPriority(service: Service) {
    service.priority++
    this.servicesService.update(service).then(() => {
      this.loadServices().then(() => {

      }).catch(err=>console.error(err))
    }).catch(err=>console.error(err))
  }

  decrementPriority(service: Service) {
    service.priority--
    this.servicesService.update(service).then(() => {
      this.loadServices().then(() => {

      }).catch(err=>console.error(err))
    }).catch(err=>console.error(err))
  }


  new_service_dialog_visible: boolean = false
  new_service: Service

  new_service_dialog_open() {
    this.new_service = new Service();
    this.new_service_dialog_visible = true;
  }

  new_service_dialog_confirm() {
    this.servicesService.createNew(this.new_service).then((newServiceId: number) => {
      this.loadServices().then(() => {
        this.new_service_dialog_visible = false
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  }



  deleteServiceDialogVisible: boolean = false
  deleteServiceObject: Service = null

  deleteServiceDialogOpen(service:Service) {
    this.deleteServiceObject = service
    this.deleteServiceDialogVisible = true
  }

  deleteServiceDialogConfirm() {
    this.servicesService.delete(this.deleteServiceObject.id).then(() => {
      this.loadServices().then(() => {
        this.deleteServiceDialogVisible = false
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  }
}
