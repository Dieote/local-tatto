import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioTattoComponent } from './studio-tatto.component';

describe('StudioTattoComponent', () => {
  let component: StudioTattoComponent;
  let fixture: ComponentFixture<StudioTattoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudioTattoComponent]
    });
    fixture = TestBed.createComponent(StudioTattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
