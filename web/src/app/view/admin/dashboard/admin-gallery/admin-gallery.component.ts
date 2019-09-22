import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { RestService } from 'src/services/rest.service';
import { HttpClient } from '@angular/common/http';
import { AppImage } from 'src/models/app-image.model';

@Component({
     selector: 'admin-gallery',
     templateUrl: './admin-gallery.component.html',
     styleUrls: ['./admin-gallery.component.css']
})

export class AdminGalleryComponent implements OnInit {

     image_list: AppImage[] = []

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public http: HttpClient
     ) { }

     ngOnInit() {
          this.update_image_list(()=>{})
     }

     update_image_list(callback:Function) {
          this.rest.get_all_app_images((images: AppImage[]) => {
               this.image_list = images
               callback()
          })
     }
    

     new_image_dialog_visible: boolean = false

     new_image_file: File

     new_image_name: string

     new_image_key: string

     open_new_image_dialog() {
          this.new_image_dialog_visible = true
     }

     new_image_name_changed(new_name: string) {
          this.new_image_key = new_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
     }

     file_input_changed(evt) {
          let file = evt.target.files.item(0)
          this.new_image_file = file
     }

     new_image_upload_submit() {
          let image: AppImage = new AppImage()
          image.name = this.new_image_name
          image.key = this.new_image_key
          this.rest.new_app_image(image, (new_id:number) => {
               let formData = new FormData()
               formData.append('key', this.new_image_key)
               formData.append('image', this.new_image_file)
               this.http.post(this.rest.api_hostname + '/upload_image_to_server', formData).subscribe((res:Response) => {
                    this.update_image_list(() => {
                         this.new_image_dialog_visible = false
                    })
               })
          })
     }

     
     delete_image_dialog_visible: boolean = false

     delete_image_file: AppImage

     delete_app_image_dialog_open(image: AppImage) {
          this.delete_image_file = image
          this.delete_image_dialog_visible = true
     }

     delete_app_image_dialog_submit() {
          this.rest.delete_app_image(this.delete_image_file, () => {
               this.update_image_list(() => {
                    this.delete_image_dialog_visible = false
               })
          })
     }
}
