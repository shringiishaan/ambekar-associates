import { Component, OnInit } from '@angular/core';
import { GalleryDialogService } from './gallery-dialog.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.css']
})

export class GalleryDialogComponent implements OnInit {

  constructor(
    public galleryDialogService: GalleryDialogService,
    public rest: RestService
  ) { }

  ngOnInit() {
  }

}
