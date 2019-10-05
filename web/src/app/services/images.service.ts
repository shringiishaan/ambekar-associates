import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { AppImage } from '../models/app-image.model';

@Injectable({
  providedIn: 'root'
})
export class AppImagesService {

  API_APPEND: string = "/images"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<AppImage[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/all')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.appImages)
        else reject(data.error)
      })
    })
  }

  getOne(imageId: number): Promise<AppImage> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/oneObject/'+imageId)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.appImage)
        else reject(data.error)
      })
    })
  }

  uploadNew(formData: FormData): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/createNew', formData)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newAppImageId)
        else reject(data.error)
      })
    })
  }

  delete(appImageId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/delete/'+appImageId,null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}