import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Service } from 'src/app/models/service.model';
import { AppImage } from 'src/app/models/app-image.model';
import { RestService } from 'src/app/rest.service';
import { ServicesService } from 'src/app/services/services.service';
import { AppImagesService } from 'src/app/services/images.service';
import { GalleryDialogService } from '../../gallery-dialog/gallery-dialog.service';

declare var $:any

@Component({
     selector: 'admin-service-edit',
     templateUrl: './admin-service-edit.component.html',
     styleUrls: ['./admin-service-edit.component.css']
})

export class AdminServiceEditComponent implements OnInit {

     service: Service

     service_completion_time_edit: Date

     articleData: string

     isGeneralEditMode: boolean

     isArticleEditMode: boolean

     subscription

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public route: ActivatedRoute,
          public router: Router,
          public servicesService: ServicesService,
          public imageService: AppImagesService,
          public galleryService: GalleryDialogService
     ) { }

     ngOnInit() {
          this.subscription = this.route.params.subscribe(params => {
              let serviceId: number = parseInt(params['serviceId'])
               if(!Number.isInteger(serviceId)) {
                    this.router.navigate(['/admin'])
               }
               else {
                    this.loadService(serviceId)
                    this.loadServiceArticleData(serviceId)
               }
          })
     }

     loadService(serviceId: number): Promise<void> {
          return new Promise((resolve, reject) => {
               this.servicesService.getOne(serviceId)
               .then((service: Service) => {
                    this.service = service
                    resolve()
               }).catch(err=>reject(err))
          })
     }

     loadServiceArticleData(serviceId: number): Promise<void> {
          return new Promise((resolve, reject) => {
               this.servicesService.getArticleData(serviceId).then((data: string) => {
                    this.articleData = data
                    resolve()
               }).catch(err=>reject(err))
          })
     }

     ngOnDestroy() {
          if(this.subscription)
          this.subscription.unsubscribe()
     }

     save_service_changes() {
          this.servicesService.update(this.service).then(() => {
               this.isGeneralEditMode = false
          }).catch(err=>console.error(err))
     }

     discard_service_changes() {
          this.loadService(this.service.id).then(() => {
               this.isGeneralEditMode = false
          }).catch(err=>console.error(err))
     }

     save_service_article_changes() {
          this.servicesService.updateArticleData(this.service.id, this.articleData).then(() => {
               this.discard_service_article_changes()
          }).catch(err=>console.error(err))
     }

     discard_service_article_changes() {
          this.loadServiceArticleData(this.service.id).then(() => {
               this.isArticleEditMode = false
          }).catch(err=>console.error(err))
     }


     

     uploadNewImage(evt) {
          let file: File = evt.target.files.item(0)
          let image: AppImage = new AppImage()
          image.name = file.name
          let formData = new FormData()
          formData.append('image', file)
          formData.append('name', file.name)
          this.imageService.uploadInService(formData, this.service.id)
          .then((newId: number) => {
               this.loadService(this.service.id).then(() => {
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }

     

     addImageFromGallery() {
          this.galleryService.open(() => {
               let image: AppImage = this.galleryService.selectedImage
               if(image) {
                    this.imageService.addImageInService(this.service.id, image.id).then(() => {
                         this.loadService(this.service.id).then(() => {
                              this.galleryService.close()
                         })
                    }).catch(err=>console.error(err))
               }
          })
     }

     



     deleteImageFromServiceDialogVisible: boolean = false
     deleteImageFromServiceDialogImage: AppImage

     deleteImageFromServiceDialogOpen(image: AppImage) {
          this.deleteImageFromServiceDialogImage = image
          this.deleteImageFromServiceDialogVisible = true
     }

     deleteImageFromServiceDialogConfirm() {
          this.imageService.deleteInService(this.service.id, this.deleteImageFromServiceDialogImage.id)
          .then(() => {
               this.loadService(this.service.id).then(() => {
                    this.deleteImageFromServiceDialogDiscard()
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }

     deleteImageFromServiceDialogDiscard() {
          this.deleteImageFromServiceDialogImage = null
          this.deleteImageFromServiceDialogVisible = false
     }


     incrementImagePriority(image: any) {
          this.imageService.updateImagePriorityInService(this.service.id, image.id, image.priority+1).then(() => {
               this.loadService(this.service.id).then(() => {

               }).catch(err => console.error(err))
          }).catch(err=>console.error(err))
     }

     decrementImagePriority(image: any) {
          this.imageService.updateImagePriorityInService(this.service.id, image.id, image.priority-1).then(() => {
               this.loadService(this.service.id).then(() => {

               }).catch(err => console.error(err))
          }).catch(err=>console.error(err))
     }
}