import { ProjectCategory } from "./project-category.model";
import { AppImage } from "./app-image.model";

export class Project {
     
     id: number
     title: string
     short_description: string
     long_description: string
     completion_time: number
     project_categories: ProjectCategory[] = []
     images: AppImage[]

     constructor() { }
}