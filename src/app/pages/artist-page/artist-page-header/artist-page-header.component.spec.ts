import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPageHeaderComponent } from './artist-page-header.component';

describe('ArtistPageHeaderComponent', () => {
  let component: ArtistPageHeaderComponent;
  let fixture: ComponentFixture<ArtistPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPageHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
