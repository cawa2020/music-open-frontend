import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPageTabsComponent } from './artist-page-tabs.component';

describe('ArtistPageTabsComponent', () => {
  let component: ArtistPageTabsComponent;
  let fixture: ComponentFixture<ArtistPageTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPageTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistPageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
