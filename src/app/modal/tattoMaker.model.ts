export class TattoMaker {
  id?: number;
  name: string;
  description: string;
  idImage: number;
  phone: string;
  available: string;
  constructor(
    id: number,
    name: string,
    description: string,
    idImage: number,
    phone: string,
    available: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.idImage = idImage;
    this.phone = phone;
    this.available = available;
  }
}
