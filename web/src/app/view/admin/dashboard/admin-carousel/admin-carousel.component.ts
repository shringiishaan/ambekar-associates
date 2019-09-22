import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { AppStateService } from "src/services/app-state.service";
import { RestService } from "src/services/rest.service";
import { Carousel } from "src/models/carousel.model";

@Component({
  selector: "admin-carousel",
  templateUrl: "./admin-carousel.component.html",
  styleUrls: ["./admin-carousel.component.css"]
})
export class AdminCarouselComponent implements OnInit {
  new_carousel_dialog_visible: boolean = false;

  new_carousel: Carousel;

  edit_carousel_dialog_visible: boolean = false;

  edit_carousel: Carousel;

  delete_carousel_dialog_visible: boolean = false;

  delete_carousel: Carousel;

  constructor(
    public rest: RestService,
    public appState: AppStateService,
    public adminS: AdminService
  ) {}

  ngOnInit() {}

  new_carousel_dialog_open() {
    this.new_carousel = new Carousel();
    this.new_carousel_dialog_visible = true;
  }

  new_carousel_dialog_confirm() {
    let list: Carousel[] = this.appState.state.carousel_list;
    list.push(this.new_carousel);
    this.rest.update_carousel_list(list, (new_id_list: number[]) => {
      this.new_carousel_dialog_visible = false;
    });
  }

  edit_carousel_dialog_open(carousel: Carousel) {
    this.edit_carousel = JSON.parse(JSON.stringify(carousel));
    this.edit_carousel_dialog_visible = true;
  }

  edit_carousel_dialog_confirm() {
    let list: Carousel[] = this.appState.state.carousel_list;
    let ind = list.findIndex(l => l.id === this.edit_carousel.id);
    list[ind] = this.edit_carousel;
    this.rest.update_carousel_list(list, (new_id_list: number[]) => {
      this.edit_carousel_dialog_visible = false;
    });
  }

  delete_carousel_dialog_open(carousel: Carousel) {
    this.delete_carousel = JSON.parse(JSON.stringify(carousel));
    this.delete_carousel_dialog_visible = true;
  }

  delete_carousel_dialog_confirm() {
    let list: Carousel[] = this.appState.state.carousel_list;
    let ind = list.findIndex(l => l.id === this.delete_carousel.id);
    list.splice(ind, 1);
    this.rest.update_carousel_list(list, (new_id_list: number[]) => {
      this.delete_carousel_dialog_visible = false;
    });
  }
}
