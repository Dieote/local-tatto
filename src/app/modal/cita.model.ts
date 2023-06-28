export class CitaModel {
  id?: number;
  nameCita: string;
  phoneCita: string;
  artist: string;
  availableCita: string;
  constructor(
    // idArtist: number,
    name: string,
    artist: string,
    phone: string,
    available: string
  ) {
    // this.idArtist = idArtist;
    this.nameCita = name;
    this.artist = artist;
    this.phoneCita = phone;
    this.availableCita = available;
  }
}
