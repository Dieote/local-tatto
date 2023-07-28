export class TattoMaker {
  id?: number;
  name: string;
  description: string;
  imageName: string;
  imageUuid: string;
  phone: string;
  available: string;
  constructor(
    id: number,
    name: string,
    description: string,
    imageName: string,
    imageUuid: string,
    phone: string,
    available: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageName = imageName;
    this.imageUuid = imageUuid;
    this.phone = phone;
    this.available = available;
  }
}
