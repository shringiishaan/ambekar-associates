import { Component, OnInit } from "@angular/core";
import { RestService } from "src/services/rest.service";
import { AppStateService } from "src/services/app-state.service";
import { AdminService } from "../../admin.service";
import { Service } from "src/models/service.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AppImage } from "src/models/app-image.model";

@Component({
  selector: "admin-service-edit",
  templateUrl: "./admin-service-edit.component.html",
  styleUrls: ["./admin-service-edit.component.css"]
})
export class AdminServiceEditComponent implements OnInit {
  service_edit: Service;

  delete_service_dialog_visible: boolean = false;

  new_image_dialog_visible: boolean = false;

  new_image: AppImage;

  constructor(
    public rest: RestService,
    public stateService: AppStateService,
    public adminS: AdminService,
    public appState: AppStateService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let service_id: number = parseInt(params["service_id"]);
      if (!service_id) this.router.navigate(["/admin"]);

      let service: Service = this.stateService.state.services.find(
        p => p.id === service_id
      );
      if (!service) this.router.navigate(["/admin"]);

      this.service_edit = JSON.parse(JSON.stringify(service));
    });
  }

  save_service_changes() {
    this.rest.update_service(this.service_edit, () => {
      this.appState.update_state(() => {
        this.router.navigate(["/admin", "services"]);
      });
    });
  }

  new_image_dialog_open() {
    this.new_image = new AppImage();
    this.new_image_dialog_visible = true;
  }

  new_image_dialog_submit() {
    this.service_edit.images.push(this.new_image);
    this.new_image = null;
    this.new_image_dialog_visible = false;
  }

  make_image_first(image: AppImage) {
    let ind: number = this.service_edit.images.findIndex(
      i => i.id === image.id
    );
    let im: AppImage = this.service_edit.images.splice(ind, 1)[0];
    this.service_edit.images.splice(0, 0, im);
  }

  delete_service_dialog_open() {
    this.delete_service_dialog_visible = true;
  }

  delete_service_dialog_submit() {
    this.rest.delete_service(this.service_edit, done => {
      this.appState.update_state(() => {
        this.delete_service_dialog_visible = false;
        this.router.navigate(["/admin", "services"]);
      });
    });
  }

  remove_image_from_service(image: AppImage) {
    let ind = this.service_edit.images.findIndex(i => i.id === image.id);
    this.service_edit.images.splice(ind, 1);
  }
}
