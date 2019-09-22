import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import { AppStateService } from 'src/services/app-state.service';

declare var $: any

@Component({
     selector: 'projects-showcase',
     templateUrl: './projects-showcase.component.html',
     styleUrls: ['./projects-showcase.component.css']
})

export class ProjectsShowcaseComponent implements OnInit {

     active_project_category: string

     constructor(
          public rest: RestService,
          public stateService: AppStateService
     ) { }

     ngOnInit() {
     }

     select_option(option: string) {
          if(option==='all') {

          }
          // $('.col-3').fadeOut(700, () => {
          //      $('.col-3').fadeIn(700)
          // })

          let target = $('.col-3')
          target.slideUp(700, () => {
               target.slideDown(700, () => {}) 
          }) 
     }

}
