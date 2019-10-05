import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  API_APPEND: string = "/projects"

  constructor(
    public rest: RestService,
    public http: HttpClient
  ) { }

  getAll(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/all')
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.projects)
        else reject(data.error)
      })
    })
  }

  getOne(projectId: number): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/one/'+projectId)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.project)
        else reject(data.error)
      })
    })
  }

  getArticleData(projectId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.rest.API_URI+this.API_APPEND+'/article/'+projectId)
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.articleData)
        else reject(data.error)
      })
    })
  }

  createNew(project: Project): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/new', {project:project})
      .subscribe((data:any) => {
        if(data && data.success) resolve(data.newProjectId)
        else reject(data.error)
      })
    })
  }

  update(project: Project): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/update', {project:project})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  updateArticleData(projectId: number, articleData: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/updateArticleData', {projectId:projectId,articleData:articleData})
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }

  delete(projectId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.rest.API_URI+this.API_APPEND+'/delete/'+projectId,null)
      .subscribe((data:any) => {
        if(data && data.success) resolve()
        else reject(data.error)
      })
    })
  }
}