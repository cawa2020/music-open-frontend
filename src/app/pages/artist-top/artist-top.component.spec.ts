import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTopComponent } from './artist-top.component';

describe('ArtistTopComponent', () => {
  let component: ArtistTopComponent;
  let fixture: ComponentFixture<ArtistTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
