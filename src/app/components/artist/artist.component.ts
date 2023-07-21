import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';
import { LoginService } from 'src/app/services/login.service';
import baserUrl from 'src/app/services/helper';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  tatuadores: TattoMaker[] = [];
  urlBase = baserUrl;
  imageUrl: string | undefined;

  constructor(
    private artistsService: ArtistsService,
    public loginservice: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const artistId = params['artistId'];
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

  getUrlImage(fileName: string): string {
    if (fileName != null) {
      return `${this.urlBase}/media/show/${fileName}`;
    } else {
      return 'assets/defauProf.jpeg';
    }
  }
}
