import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  tatuadores: TattoMaker[] = [];

  constructor(
    private artistsService: ArtistsService,
    public loginservice: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const artistId = params['id'];
      if (artistId) {
        this.artistsService.getArtistById(artistId).subscribe((artist) => {
          console.log(artist);
        });
      }
    });

    this.artistsService.getArtists().subscribe((respons) => {
      this.tatuadores = respons;
    });
  }
}
