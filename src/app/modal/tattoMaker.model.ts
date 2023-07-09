export class TattoMaker {
  id?: number;
  name: string;
  description: string;
  image: string;
  phone: string;
  available: string;
  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    phone: string,
    available: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.phone = phone;
    this.available = available;
  }
}
