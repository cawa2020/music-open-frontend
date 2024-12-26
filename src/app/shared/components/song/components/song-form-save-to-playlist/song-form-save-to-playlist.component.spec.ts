import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFormSaveToPlaylistComponent } from './song-form-save-to-playlist.component';

describe('SongFormSaveToPlaylistComponent', () => {
  let component: SongFormSaveToPlaylistComponent;
  let fixture: ComponentFixture<SongFormSaveToPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongFormSaveToPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongFormSaveToPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
