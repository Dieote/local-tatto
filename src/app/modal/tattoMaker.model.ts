export class TattoMaker {
  id?: number;
  name: string;
  description: string;
  image: string;
  phone: string;
  available: string;
  constructor(
    // idArtist: number,
    name: string,
    description: string,
    image: string,
    phone: string,
    available: string
  ) {
    // this.idArtist = idArtist;
    this.name = name;
    this.description = description;
    this.image = image;
    this.phone = phone;
    this.available = available;
  }
}
