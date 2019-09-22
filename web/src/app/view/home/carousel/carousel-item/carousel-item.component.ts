import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/services/app-state.service';
import { RestService } from 'src/services/rest.service';

@Component({
  selector: 'carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  constructor(
       public stateService: AppStateService,
       public rest: RestService
  ) { }

  ngOnInit() {
  }

}
