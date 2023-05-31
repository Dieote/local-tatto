export class TattoMaker {
  idArtist: number;
  name: string;
  description: string;
  image: string;
  phone: string;
  available: boolean;
  constructor(
    idArtist: number,
    name: string,
    description: string,
    image: string,
    phone: string,
    available: boolean
  ) {
    this.idArtist = idArtist;
    this.name = name;
    this.description = description;
    this.image = image;
    this.phone = phone;
    this.available = available;
  }
}
