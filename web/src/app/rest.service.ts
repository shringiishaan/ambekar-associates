import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class RestService {

    // API_URI: string = "http://139.59.2.78:7001/rest"
    API_URI: string = "http://localhost:7001/rest"

    constructor(
        public http: HttpClient
    ) { }
}
