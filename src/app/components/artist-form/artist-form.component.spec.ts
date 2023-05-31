import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFormComponent } from './artist-form.component';

describe('ArtistFormComponent', () => {
  let component: ArtistFormComponent;
  let fixture: ComponentFixture<ArtistFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistFormComponent]
    });
    fixture = TestBed.createComponent(ArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
