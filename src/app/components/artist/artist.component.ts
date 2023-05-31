import { Component, OnInit } from '@angular/core';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  ngOnInit(): void {
    this.getArtists();
  }
  tatuadores: TattoMaker[] = [];
  constructor(private artistsService: ArtistsService) {}

  getArtists() {
    this.artistsService.verArtistas().subscribe((tattoMakers) => {
      this.tatuadores = tattoMakers;
    });
  }
}
