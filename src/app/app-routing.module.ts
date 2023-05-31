import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  // path : artistForm , componet ArtispFormCompoent,
  // path : artistForm/:id , componet ArtispFormCompoent,
})
export class AppRoutingModule {}
