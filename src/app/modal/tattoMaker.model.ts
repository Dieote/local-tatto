export class TattoMaker {
  name: string;
  description: string;
  image: string;
  phone: string;
  available: boolean;
  constructor(
    name: string,
    description: string,
    image: string,
    phone: string,
    available: boolean
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.phone = phone;
    this.available = available;
  }
}
