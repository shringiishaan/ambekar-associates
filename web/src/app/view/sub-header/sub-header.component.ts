import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
     selector: 'sub-header',
     templateUrl: './sub-header.component.html',
     styleUrls: ['./sub-header.component.css']
})

export class SubHeaderComponent implements OnInit {

     @Input() header_text: string = null

     @Input() carousel: boolean = false

     constructor(
     ) { }

     ngOnInit() {
     }

}
