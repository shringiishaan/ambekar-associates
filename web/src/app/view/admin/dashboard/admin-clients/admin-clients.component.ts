import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { RestService } from 'src/app/rest.service';

@Component({
     selector: 'admin-clients',
     templateUrl: './admin-clients.component.html',
     styleUrls: ['./admin-clients.component.css']
})

export class AdminClientsComponent implements OnInit {


     new_client_dialog_visible: boolean = false

     // new_client: Client


     edit_client_dialog_visible: boolean = false

     // edit_client: Client

     
     delete_client_dialog_visible: boolean = false

     // delete_client: Client
          

     constructor(
          public adminS: AdminService,
          public rest: RestService
     ) { }

     ngOnInit() { }


     new_client_dialog_open() {
          // this.new_client = new Client()
          // this.new_client.name = "New Client Name"
          // this.new_client.image_key = null
          // this.new_client_dialog_visible = true
     }

     new_client_submit() {
          // this.rest.new_client(this.new_client, (new_id: number) => {
          //      this.appState.update_state(() => {
          //           this.new_client_dialog_visible = false
          //      })
          // })
     }

     edit_client_dialog_open(client) {
          // this.edit_client = JSON.parse(JSON.stringify(client))
          // this.edit_client_dialog_visible = true
     }

     edit_client_confirm() {
          // this.rest.update_client(this.edit_client, () => {
          //      this.appState.update_state(() => {
          //           this.edit_client_dialog_visible = false
          //      })
          // })
     }

     delete_client_dialog_open(client) {
          // this.delete_client = client
          // this.delete_client_dialog_visible = true
     }

     delete_client_confirm() {
          // this.rest.delete_client(this.delete_client, () => {
          //      this.appState.update_state(() => {
          //           this.delete_client_dialog_visible = false
          //      })
          // })
     }
}
