import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TattoMakersService } from './services/tatto-makers.service';
import { StudioTattoComponent } from './components/studio-tatto/studio-tatto.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

const routes: Routes = [
  { path: '', component: CarrouselComponent },
  { path: 'home', component: CarrouselComponent },
  { path: 'estudio', component: StudioTattoComponent },

  { path: 'autor', component: TattoMakersService },
  { path: 'autor/:id', component: TattoMakersService },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
