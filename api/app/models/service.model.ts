export class Service {

  id: number = 0
  title: string = ''
  priority: number = 1
  imageIds: {
    priority: number
    id: number
  }[] = []

  constructor() { }
}