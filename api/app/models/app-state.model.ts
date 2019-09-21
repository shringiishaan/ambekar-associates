import { Project } from "./project.model";
import { Service } from "./service.model";
import { ProjectCategory } from "./project-category.model";
import { Carousel } from "./carousel.model";
import { Client } from "./client.model";

export class AppState {
     
     projects: Project[]

     services: Service[]

     clients: Client[]

     project_categories: ProjectCategory[]

     home_projects_display_count: number

     carousel_list: Carousel[]

     constructor() { 
          this.projects = []
          this.services = []
          this.clients = []
          this.project_categories = []
          this.home_projects_display_count = 1
          this.carousel_list = []
     }
}