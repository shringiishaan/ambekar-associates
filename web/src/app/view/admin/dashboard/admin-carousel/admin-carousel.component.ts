import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
import { Carousel } from "src/app/models/carousel.model";
import { RestService } from "src/app/rest.service";
import { CarouselService } from "src/app/services/carousel.service";
import { AppImage } from "src/app/models/app-image.model";
import { AppImagesService } from "src/app/services/images.service";

@Component({
  selector: "admin-carousel",
  templateUrl: "./admin-carousel.component.html",
  styleUrls: ["./admin-carousel.component.css"]
})

export class AdminCarouselComponent implements OnInit {

  carousels: Carousel[] = []

  constructor(
    public rest: RestService,
    public adminS: AdminService,
    public carouselService: CarouselService,
    public imageService: AppImagesService
  ) {}

  ngOnInit() {
    this.loadCarousels().catch(err=>console.error(err))
  }

  loadCarousels(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.carouselService.getAll().then(c=>this.carousels=c)
      .then(() => resolve())
      .catch(err=>reject(err))
    })
  }


     

  uploadNewImage(evt) {
    let file: File = evt.target.files.item(0)
    let image: AppImage = new AppImage()
    image.name = file.name
    let formData = new FormData()
    formData.append('image', file)
    formData.append('name', file.name)
    this.imageService.uploadNew(formData).then((newImageId: number) => {
      let carousel: Carousel = new Carousel()
      carousel.imageId = newImageId
      this.carouselService.createNew(carousel).then(() => {
        this.loadCarousels().then(() => {
        }).catch(err=>console.error(err))
      }).catch(err=>console.error(err))
    }).catch(err=>console.error(err))
  }

  

  edit_carousel_dialog_visible: boolean = false;
  edit_carousel: Carousel;

  edit_carousel_dialog_open(carousel: Carousel) {
    this.edit_carousel = JSON.parse(JSON.stringify(carousel))
    this.edit_carousel_dialog_visible = true
  }

  edit_carousel_dialog_confirm() {
    this.carouselService.update(this.edit_carousel).then(() => {
      this.loadCarousels().then(() => {
        this.edit_carousel = null
        this.edit_carousel_dialog_visible = false
      }).catch(err=>console.error(err))
    }).catch(err=>console.error(err))
  }


  

  delete_carousel_dialog_visible: boolean = false;
  delete_carousel: Carousel;

  delete_carousel_dialog_open(carousel: Carousel) {
    this.delete_carousel = JSON.parse(JSON.stringify(carousel))
    this.delete_carousel_dialog_visible = true
  }

  delete_carousel_dialog_confirm() {
    this.carouselService.delete(this.delete_carousel.id).then(() => {
      this.loadCarousels().then(() => {
        this.delete_carousel = null
        this.delete_carousel_dialog_visible = false
      }).catch(err=>console.error(err))
    }).catch(err=>console.error(err))
  }
}
