import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { AppImage } from 'src/app/models/app-image.model';
import { RestService } from 'src/app/rest.service';
import { AppImagesService } from 'src/app/services/images.service';

@Component({
     selector: 'admin-gallery',
     templateUrl: './admin-gallery.component.html',
     styleUrls: ['./admin-gallery.component.css']
})

export class AdminGalleryComponent implements OnInit {

     appImages: AppImage[]

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public http: HttpClient,
          public imageService: AppImagesService
     ) { }

     ngOnInit() {
          this.updateAppImages()
          .catch(err=>console.error(err))
     }

     updateAppImages() {
          this.appImages = null
          return new Promise((resolve, reject) => {
               this.imageService.getAll().then((images: AppImage[]) => {
                    this.appImages = images
                    resolve()
               }).catch(err=>reject(err))
          })
     }
    

     new_image_dialog_visible: boolean = false

     new_image_file: File

     new_image_name: string

     open_new_image_dialog() {
          this.new_image_dialog_visible = true
     }

     new_image_name_changed(new_name: string) {
          // this.new_image_key = new_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
     }

     uploadNewImage(evt) {
          let file: File = evt.target.files.item(0)
          this.new_image_file = file
          let image: AppImage = new AppImage()
          image.name = file.name
          let formData = new FormData()
          formData.append('image', this.new_image_file)
          formData.append('name', this.new_image_file.name)
          this.imageService.uploadNew(formData)
          .then((newId: number) => {
               console.log(newId)
               this.updateAppImages().then(() => {
                    this.new_image_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }
 
     
     delete_image_dialog_visible: boolean = false

     delete_image_file: AppImage

     delete_app_image_dialog_open(image: AppImage) {
          this.delete_image_file = image
          this.delete_image_dialog_visible = true
     }

     delete_app_image_dialog_submit() {
          this.imageService.delete(this.delete_image_file.id).then(() => {
               this.updateAppImages().then(() => {
                    this.delete_image_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }
}
