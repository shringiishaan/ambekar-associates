import { Component, OnInit, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

declare var $: any

@Component({
     selector: 'navbar',
     templateUrl: './navbar.component.html',
     styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

     @Input() background_transparent: boolean = false

     @Input() active_page: string = null

     constructor(
          public route: ActivatedRoute
     ) { }

     ngOnInit() {

          $('#myDropdown').on('show.bs.dropdown', ()=>{})          
     
          $(window).on("scroll load resize", () => {
                    
               if(this.background_transparent) {
                    var startY = $('#app-carousel').height() / 2

                    if ($(window).scrollTop() > startY) {
                         $('.navbar').addClass("scrolled navbar-light bg-light")
                    } else {
                         $('.navbar').removeClass("scrolled navbar-light bg-light")
                    }
               }
               else {
                    $('.navbar').addClass("scrolled navbar-light bg-light")
               }
          })
     }

     ngAfterViewInit() {
          if(this.background_transparent) {
               var startY = $('#app-carousel').height() - $('.navbar').height()

               if ($(window).scrollTop() > startY) {
                    $('.navbar').addClass("scrolled navbar-light bg-light")
               } else {
                    $('.navbar').removeClass("scrolled navbar-light bg-light")
               }
          }
          else {
               $('.navbar').addClass("scrolled navbar-light bg-light")
          }
     }

     scrollto_projects_section() {
          $('html, body').animate({
               scrollTop: $("#section-our-projects").offset().top - $('.navbar').height() - 20
          }, 1000)
     }

     scrollto_services_section() {
          $('html, body').animate({
               scrollTop: $("#section-our-services").offset().top - $('.navbar').height() - 20
          }, 1000)
     }

     scrollto_aboutus_section() {
          $('html, body').animate({
               scrollTop: $("#section-about-us").offset().top - $('.navbar').height() - 20
          }, 1000)
     }

     scrollto_clients_section() {
          $('html, body').animate({
               scrollTop: $("#section-our-clients").offset().top - $('.navbar').height() - 20
          }, 1000)
     }

}
