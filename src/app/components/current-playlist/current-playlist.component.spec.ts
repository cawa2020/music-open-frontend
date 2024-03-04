import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlaylistComponent } from './current-playlist.component';

describe('CurrentPlaylistComponent', () => {
  let component: CurrentPlaylistComponent;
  let fixture: ComponentFixture<CurrentPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
