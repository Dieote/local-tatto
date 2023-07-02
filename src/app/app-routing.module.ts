import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudioTattoComponent } from './components/studio-tatto/studio-tatto.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { HomeComponent } from './components/home/home.component';
import { ComentsComponent } from './components/coments/coments.component';
import { ArtistComponent } from './components/artist/artist.component';
import { CitaFormComponent } from './components/cita-form/cita-form.component';
import { ListCitasComponent } from './components/list-citas/list-citas.component';
import { DesignsComponent } from './components/designs/designs.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'estudio', component: StudioTattoComponent },
  { path: 'coments', component: ComentsComponent },
  { path: 'artists', component: ArtistComponent },
  { path: 'date', component: CitaFormComponent },
  { path: 'schedule', component: ListCitasComponent },
  { path: 'designs', component: DesignsComponent },
  { path: 'signIn', component: SignupComponent },

  { path: 'autor', component: ArtistFormComponent },
  { path: 'autor/:id', component: ArtistFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
