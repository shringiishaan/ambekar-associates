import { AppImage } from "./app-image.model";

export class Service {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  images: AppImage[] = [];

  constructor() {}
}
