export class TattoMaker {
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  avalible: boolean;
  constructor(
    name: string,
    description: string,
    image: string,
    phoneNumber: string,
    avalible: boolean
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.avalible = avalible;
  }
}
