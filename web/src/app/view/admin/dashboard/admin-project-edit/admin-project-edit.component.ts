import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Project } from 'src/app/models/project.model';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { AppImage } from 'src/app/models/app-image.model';
import { RestService } from 'src/app/rest.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectCategoriesService } from 'src/app/services/project-categories.service';
import { AppImagesService } from 'src/app/services/images.service';
import { GalleryDialogService } from '../../gallery-dialog/gallery-dialog.service';

declare var $:any

@Component({
     selector: 'admin-project-edit',
     templateUrl: './admin-project-edit.component.html',
     styleUrls: ['./admin-project-edit.component.css']
})

export class AdminProjectEditComponent implements OnInit {

     projectCategories: ProjectCategory[] = []

     project: Project

     project_completion_time_edit: Date

     articleData: string

     isGeneralEditMode: boolean

     isArticleEditMode: boolean

     subscription

     constructor(
          public rest: RestService,
          public adminS: AdminService,
          public route: ActivatedRoute,
          public router: Router,
          public projectsService: ProjectsService,
          public projectCategroiesService: ProjectCategoriesService,
          public imageService: AppImagesService,
          public galleryService: GalleryDialogService
     ) { }

     ngOnInit() {
          this.projectCategroiesService.getAll().then(cats => this.projectCategories = cats)
          .catch(err=>console.error(err))
          this.subscription = this.route.params.subscribe(params => {
              let projectId: number = parseInt(params['projectId'])
               if(!Number.isInteger(projectId)) {
                    this.router.navigate(['/admin'])
               }
               else {
                    this.loadProject(projectId)
                    this.loadProjectArticleData(projectId)
               }
          })
     }

     loadProject(projectId: number): Promise<void> {
          return new Promise((resolve, reject) => {
               this.projectsService.getOne(projectId)
               .then((project: Project) => {
                    this.project = project
                    this.project_completion_time_edit = this.project.completionTime?new Date(this.project.completionTime):null
                    resolve()
               }).catch(err=>reject(err))
          })
     }

     loadProjectArticleData(projectId: number): Promise<void> {
          return new Promise((resolve, reject) => {
               this.projectsService.getArticleData(projectId).then((data: string) => {
                    this.articleData = data
                    resolve()
               }).catch(err=>reject(err))
          })
     }

     ngOnDestroy() {
          if(this.subscription)
          this.subscription.unsubscribe()
     }


     addImageFromGallery() {
          this.galleryService.open(() => {
               let image: AppImage = this.galleryService.selectedImage
               if(image) {
                    this.imageService.addImageInProject(this.project.id, image.id).then(() => {
                         this.loadProject(this.project.id).then(() => {
                              this.galleryService.close()
                         })
                    }).catch(err=>console.error(err))
               }
          })
     }


     save_project_changes() {
          this.project.completionTime = new Date(this.project_completion_time_edit).getTime()
          this.projectsService.update(this.project).then(() => {
               this.isGeneralEditMode = false
          }).catch(err=>console.error(err))
     }

     discard_project_changes() {
          this.loadProject(this.project.id).then(() => {
               this.isGeneralEditMode = false
          }).catch(err=>console.error(err))
     }

     save_project_article_changes() {
          this.projectsService.updateArticleData(this.project.id, this.articleData).then(() => {
               this.discard_project_article_changes()
          }).catch(err=>console.error(err))
     }

     discard_project_article_changes() {
          this.loadProjectArticleData(this.project.id).then(() => {
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
          this.imageService.uploadInProject(formData, this.project.id)
          .then((newId: number) => {
               this.loadProject(this.project.id).then(() => {
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }

     



     deleteImageFromProjectDialogVisible: boolean = false
     deleteImageFromProjectDialogImage: AppImage

     deleteImageFromProjectDialogOpen(image: AppImage) {
          this.deleteImageFromProjectDialogImage = image
          this.deleteImageFromProjectDialogVisible = true
     }

     deleteImageFromProjectDialogConfirm() {
          this.imageService.deleteInProject(this.project.id, this.deleteImageFromProjectDialogImage.id)
          .then(() => {
               this.loadProject(this.project.id).then(() => {
                    this.deleteImageFromProjectDialogDiscard()
               }).catch(err=>console.error(err))
          }).catch(err=>console.error(err))
     }

     deleteImageFromProjectDialogDiscard() {
          this.deleteImageFromProjectDialogImage = null
          this.deleteImageFromProjectDialogVisible = false
     }


     incrementImagePriority(image: any) {
          this.imageService.updateImagePriorityInProject(this.project.id, image.id, image.priority+1).then(() => {
               this.loadProject(this.project.id).then(() => {

               }).catch(err => console.error(err))
          }).catch(err=>console.error(err))
     }

     decrementImagePriority(image: any) {
          this.imageService.updateImagePriorityInProject(this.project.id, image.id, image.priority-1).then(() => {
               this.loadProject(this.project.id).then(() => {

               }).catch(err => console.error(err))
          }).catch(err=>console.error(err))
     }
}