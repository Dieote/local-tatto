export class CitaModel {
  id?: number;
  nameCita: string;
  phoneCita: string;
  artist: string;
  availableCita: string;
  constructor(name: string, artist: string, phone: string, available: string) {
    this.nameCita = name;
    this.artist = artist;
    this.phoneCita = phone;
    this.availableCita = available;
  }
}
