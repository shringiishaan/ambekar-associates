import { Component, OnInit } from '@angular/core'
import EmblaCarousel from 'embla-carousel'

@Component({
     selector: 'carousel',
     templateUrl: './carousel.component.html',
     styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {

     active: boolean = true

     movement

     movementInterval: number = 3000

     waitTimeBeforeMovement: number = 5000

     activityOnCarousel: boolean = false

     constructor() { }

     ngOnInit() {
          const embla = EmblaCarousel(document.getElementById('carousel'), {
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

          let onActivity = () => {
               this.activityOnCarousel = true
               setTimeout(() => {
                    this.activityOnCarousel = false
               }, this.waitTimeBeforeMovement)
          }
          
          // embla.on(new Event('click'), onActivity)
          embla.on('dragStart', onActivity)

          if(this.active)
          this.movement = setInterval(() => {
               if(!this.activityOnCarousel)
                    embla.scrollNext()
          }, this.movementInterval)
     }

     ngOnDestroy() {
          clearInterval(this.movement)
     }
}
