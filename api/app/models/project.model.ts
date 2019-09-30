export class Project {
     
     id: number = 0
     title: string = ''
     completionTime: number = 0
     projectCategoryName: string = ''
     imageIds: {
       priority: number
       id: number
     }[] = []

     constructor() { }
}