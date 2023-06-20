import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ManagementButtonsComponent } from './components/management-buttons/management-buttons.component';
import { ArtistsService } from './services/artists.service';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { RouterModule } from '@angular/router';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { StudioTattoComponent } from './components/studio-tatto/studio-tatto.component';
import { ComentsComponent } from './components/coments/coments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ArtistComponent,
    ManagementButtonsComponent,
    CarrouselComponent,
    ArtistFormComponent,
    StudioTattoComponent,
    ComentsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
