import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudioTattoComponent } from './components/studio-tatto/studio-tatto.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';

const routes: Routes = [
  { path: '', component: CarrouselComponent },
  { path: 'home', component: CarrouselComponent },
  { path: 'estudio', component: StudioTattoComponent },

  { path: 'autor', component: ArtistFormComponent },
  { path: 'autor/:id', component: ArtistFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
