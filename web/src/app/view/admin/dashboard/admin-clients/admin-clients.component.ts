import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { RestService } from 'src/app/rest.service';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { GalleryDialogService } from '../../gallery-dialog/gallery-dialog.service';
import { AppImage } from 'src/app/models/app-image.model';

@Component({
     selector: 'admin-clients',
     templateUrl: './admin-clients.component.html',
     styleUrls: ['./admin-clients.component.css']
})

export class AdminClientsComponent implements OnInit {

     clients: Client[]

     constructor(
          public adminS: AdminService,
          public rest: RestService,
          public clientsService: ClientsService,
          public galleryDialog: GalleryDialogService
     ) { }

     ngOnInit() { 
          this.loadClients()
     }


     loadClients(): Promise<void> {
          this.clients = null
          return new Promise((resolve, reject) => {
               this.clientsService.getAll().then(c=>{
                    this.clients=c
                    resolve()
               })
               .catch(err=>reject(err))
          })
     }


     incrementPriority(client: Client) {
          client.priority++
          this.clientsService.update(client).then(() => {
               this.loadClients().then(() => {

               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }

     decrementPriority(client: Client) {
          client.priority--
          this.clientsService.update(client).then(() => {
               this.loadClients().then(() => {

               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }


     
     new_client_dialog_visible: boolean = false
     new_client: Client

     new_client_dialog_open() {
          this.galleryDialog.open(() => {
               let image: AppImage = this.galleryDialog.selectedImage
               if(image) {
                    this.new_client = new Client()
                    this.new_client.imageId = image.id
                    this.new_client.name = "Client Name"
                    this.new_client_dialog_visible = true
                    this.galleryDialog.close()
               }
          })
     }

     new_client_submit() {
          this.clientsService.createNew(this.new_client).then((newClientId: number) => {
               this.loadClients().then(() => {
                    this.new_client_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }


     


     edit_client_dialog_visible: boolean = false
     edit_client: Client

     edit_client_dialog_open(client) {
          this.edit_client = JSON.parse(JSON.stringify(client))
          this.edit_client_dialog_visible = true
     }

     edit_client_confirm() {
          this.clientsService.update(this.edit_client).then(() => {
               this.loadClients().then(() => {
                    this.edit_client_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }


     

     
     delete_client_dialog_visible: boolean = false
     delete_client: Client

     delete_client_dialog_open(client) {
          this.delete_client = client
          this.delete_client_dialog_visible = true
     }

     delete_client_confirm() {
          this.clientsService.delete(this.delete_client.id).then(() => {
               this.loadClients().then(() => {
                    this.delete_client_dialog_visible = false
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }
}
