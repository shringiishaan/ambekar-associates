import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service.model";
import { AppImage } from "src/app/models/app-image.model";
import { RestService } from "src/app/rest.service";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "admin-service-edit",
  templateUrl: "./admin-service-edit.component.html",
  styleUrls: ["./admin-service-edit.component.css"]
})
export class AdminServiceEditComponent implements OnInit {

  service_edit: Service

  delete_service_dialog_visible: boolean = false;

  new_image_dialog_visible: boolean = false;

  new_image: AppImage

  constructor(
    public rest: RestService,
    public adminS: AdminService,
    public route: ActivatedRoute,
    public router: Router,
    public servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let serviceId: number = parseInt(params["serviceId"]);
      if (!Number.isInteger(serviceId)) {
        this.router.navigate(["/admin"])
      }
      else {
        this.servicesService.getOne(serviceId).then((service: Service) => {
          this.service_edit = JSON.parse(JSON.stringify(service));
        })
      }
    });
  }

  save_service_changes() {
    this.servicesService.update(this.service_edit).then(() => {
      this.router.navigate(["/admin", "services"])
    })
  }

  new_image_dialog_open() {
    this.new_image = new AppImage();
    this.new_image_dialog_visible = true;
  }

  new_image_dialog_submit() {
    let maxP: number = 0
    this.service_edit.imageIds.forEach(k=>maxP=(k.priority>maxP)?(k.priority+1):maxP)
    this.service_edit.imageIds.push({priority:maxP,id:this.new_image.id})
    this.new_image = null
    this.new_image_dialog_visible = false
  }

  delete_service_dialog_open() {
    this.delete_service_dialog_visible = true;
  }

  delete_service_dialog_submit() {
    this.servicesService.delete(this.service_edit.id).then(done => {
      this.delete_service_dialog_visible = false
      this.router.navigate(["/admin", "services"])
    })
  }

  remove_image_from_service(image: AppImage) {
    let ind = this.service_edit.imageIds.findIndex(i => i.id === image.id)
    this.service_edit.imageIds.splice(ind, 1)
  }
}
