export class TattoMaker {
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  available: boolean;
  constructor(
    name: string,
    description: string,
    image: string,
    phoneNumber: string,
    available: boolean
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.available = available;
  }
}
