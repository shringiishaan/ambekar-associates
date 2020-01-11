import { Component, OnInit, AfterViewInit } from '@angular/core'
import EmblaCarousel from 'embla-carousel'
import { Carousel } from 'src/app/models/carousel.model'
import { AppImagesService } from 'src/app/services/images.service'
import { CarouselService } from 'src/app/services/carousel.service'

@Component({
     selector: 'carousel-1',
     templateUrl: './carousel.component.html',
     styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements AfterViewInit {

     active: boolean = true

     movement

     movementInterval: number = 3000

     waitTimeBeforeMovement: number = 5000

     activityOnCarousel: boolean = false

     carousels: Carousel[] = []

     constructor(
          public carouselService: CarouselService
     ) { }

     ngAfterViewInit() {
          this.loadCarousels().then(() => {
               this.initializeCarousel()
          }).catch(err=>console.error(err))
     }

     initializeCarousel() {
          let carousel = document.getElementById('carousel')
          const embla = EmblaCarousel(carousel, {
               align: 'center',
               containerSelector: '.cr-container',
               slidesToScroll: 1,
               containScroll: true,
               draggable: true,
               dragFree: false,
               loop: true,
               speed: 10,
               startIndex: 0,
               selectedClass: 'is-selected',
               draggableClass: 'is-draggable',
               draggingClass: 'is-dragging',
          })
          embla.scrollNext()

          let onActivity = () => {
               this.activityOnCarousel = true
               setTimeout(() => {
                    this.activityOnCarousel = false
               }, this.waitTimeBeforeMovement)
          }
          
          // embla.on('click', onActivity)
          embla.on('dragStart', onActivity)

          if(this.active) {
               this.movement = setInterval(() => {
                    if(!this.activityOnCarousel) {
                         console.log(embla)
                         embla.scrollNext()
                    }
               }, this.movementInterval)
          }
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

     ngOnDestroy() {
          clearInterval(this.movement)
     }
}
