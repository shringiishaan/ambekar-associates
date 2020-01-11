import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Carousel } from 'src/app/models/carousel.model';

@Component({
  selector: 'carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  @Input() carousel: Carousel

  constructor(
       public rest: RestService
  ) { }

  ngOnInit() {
  }

}
