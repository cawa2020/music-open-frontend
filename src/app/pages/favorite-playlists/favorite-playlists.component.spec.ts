import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePlaylistsComponent } from './favorite-playlists.component';

describe('FavoritePlaylistsComponent', () => {
  let component: FavoritePlaylistsComponent;
  let fixture: ComponentFixture<FavoritePlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePlaylistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritePlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
