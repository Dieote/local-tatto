import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';
import { LoginService } from 'src/app/services/login.service';
import baserUrl from 'src/app/services/helper';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
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

  deleteArtist(artistId: number): void {
    this.artistsService.deleteArtist(artistId).subscribe(
      (data: any) => {
        this.toastr.success('Artista eliminado correctamente.');
        console.log(data.message);
        this.tatuadores = this.tatuadores.filter(
          (tattoMaker) => tattoMaker.id !== artistId
        );
        this.router.navigate(['artists']);
      },
      (error) => {
        this.toastr.error('Error al eliminar el Artista.');
        console.error('Error al eliminar el Artista:', error);
      }
    );
  }

  callSuccesToastr(mensaje: string) {
    this.toastr.success(mensaje);
  }
}
