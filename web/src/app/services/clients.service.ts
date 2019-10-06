import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  API_APPEND: string = "/images"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<Client[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/getAllClients')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.clients)
        else reject(data.error)
      })
    })
  }

  createNew(client: Client): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/newClient', {client:client})
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newClientId)
        else reject(data.error)
      })
    })
  }

  update(client: Client): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updateClient', {client:client})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  delete(clientId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/deleteClient/',{clientId:clientId})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}