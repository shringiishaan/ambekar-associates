import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  API_APPEND: string = "/services"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<Service[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/all')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.services)
        else reject(data.error)
      })
    })
  }

  getOne(serviceId: number): Promise<Service> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/one'+serviceId)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.service)
        else reject(data.error)
      })
    })
  }

  createNew(service: Service): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/createNew', {service:service})
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newServiceId)
        else reject(data.error)
      })
    })
  }

  update(service: Service): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/update', {service:service})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  updateArticleData(serviceId: number, articleData: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updateArticleData', {serviceId:serviceId,articleData:articleData})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  delete(serviceId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/delete/'+serviceId,null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}