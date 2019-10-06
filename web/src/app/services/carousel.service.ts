import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Service } from '../models/service.model';
import { Carousel } from '../models/carousel.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  API_APPEND: string = "/images"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<Carousel[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/getAllCarousels')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.carousels)
        else reject(data.error)
      })
    })
  }

  createNew(carousel: Carousel): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/newCarousel', {carousel:carousel})
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newCarouselId)
        else reject(data.error)
      })
    })
  }

  update(carousel: Carousel): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updateCarousel', {carousel:carousel})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  delete(carouselId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/deleteCarousel/',{carouselId:carouselId})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}