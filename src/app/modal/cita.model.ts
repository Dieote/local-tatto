export class CitaModel {
  id?: number;
  name: string;
  phone: string;
  artist: string;
  available: string;
  constructor(
    // idArtist: number,
    name: string,
    artist: string,
    phone: string,
    available: string
  ) {
    // this.idArtist = idArtist;
    this.name = name;
    this.artist = artist;
    this.phone = phone;
    this.available = available;
  }
}
