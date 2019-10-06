import { Injectable } from '@angular/core';
import { AppImage } from 'src/app/models/app-image.model';
import { AppImagesService } from 'src/app/services/images.service';

@Injectable({
  providedIn: 'root'
})

export class GalleryDialogService {

  visible: boolean = false

  images: AppImage[] = []

  selectedImage: AppImage

  callback: Function

  constructor(
    public imageService: AppImagesService
  ) { }

  loadImages(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imageService.getAll().then((images:AppImage[]) => {
        this.images = images
        resolve()
      }).catch(err=>reject(err))
    })
  }

  open(callback: Function) {
    this.callback = callback
    this.loadImages().then(() => {
      this.visible = true
    }).catch(err=>console.error(err))
  }

  close() {
    this.images = []
    this.callback = null
    this.visible = false
  }

  selectImage(image: AppImage) {
    this.selectedImage = image
  }

  submitSelect() {
    if(this.callback) this.callback()
  }
}
