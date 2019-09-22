import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

     login: boolean = true

     current_page: string = 'dashboard'

     dashboard_container_style = {
          'padding-top':'0px'
     }

     constructor() { }
}
