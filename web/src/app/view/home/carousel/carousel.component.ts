import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/models/carousel.model';
import { CarouselService } from 'src/app/services/carousel.service';
import { RestService } from 'src/app/rest.service';

declare var $:any

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carousels: Carousel[] = []

  constructor(
       public carouselService: CarouselService,
       public rest: RestService
  ) { }

  ngOnInit() {
    this.loadCarousels().then(() => {
    }).catch(err=>console.error(err))
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.carousel').carousel({
        interval: 2000
      }, 100)
    })
    // setInterval(() => {
    //   $('.carousel').carousel('next')
    // }, 500)
  }

  loadCarousels(): Promise<void> {
       return new Promise((resolve, reject) => {
            this.carouselService.getAll().then(c=>{
                 this.carousels=c
                 resolve()
            })
            .catch(err=>reject(err))
       })
  }
}
