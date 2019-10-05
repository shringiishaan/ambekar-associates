import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { ProjectCategory } from '../models/project-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoriesService {

  API_APPEND: string = "/projectCategories"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<ProjectCategory[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/all')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.projectCategories)
        else reject(data.error)
      })
    })
  }

  getOne(projectCategoryId: number): Promise<ProjectCategory> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/one/'+projectCategoryId)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.projectCategory)
        else reject(data.error)
      })
    })
  }

  createNew(projectCategory: ProjectCategory): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/new', {projectCategory:projectCategory})
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newProjectCategoryId)
        else reject(data.error)
      })
    })
  }

  update(projectCategory: ProjectCategory): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/update', {projectCategory:projectCategory})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  delete(projectCategoryId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/delete/'+projectCategoryId,null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}