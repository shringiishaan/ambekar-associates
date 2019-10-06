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
      this.http.post(this.rest.API_URI+this.API_APPEND+'/new', formData)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newAppImageId)
        else reject(data.error)
      })
    })
  }

  deleteInProject(projectId: number, appImageId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/deleteInProject/'+projectId+'/'+appImageId, null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  uploadInProject(formData: FormData, projectId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      formData.append('projectId', projectId.toString())
      this.http.post(this.rest.API_URI+this.API_APPEND+'/newInProject', formData)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newAppImageId)
        else reject(data.error)
      })
    })
  }

  addImageInProject(projectId: number, appImageId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/addImageInProject', {projectId:projectId,appImageId:appImageId})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  addImageInService(serviceId: number, appImageId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/addImageInService', {serviceId:serviceId,appImageId:appImageId})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  deleteInService(serviceId: number, appImageId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/deleteInService/'+serviceId+'/'+appImageId, null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  uploadInService(formData: FormData, serviceId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      formData.append('serviceId', serviceId.toString())
      this.http.post(this.rest.API_URI+this.API_APPEND+'/newInService', formData)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newAppImageId)
        else reject(data.error)
      })
    })
  }

  updateImagePriorityInProject(projectId: number, appImageId: number, priority: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updatePriorityInProject/'+projectId+'/'+appImageId, {priority:priority})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  updateImagePriorityInService(serviceId: number, appImageId: number, priority: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updatePriorityInService/'+serviceId+'/'+appImageId, {priority:priority})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
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