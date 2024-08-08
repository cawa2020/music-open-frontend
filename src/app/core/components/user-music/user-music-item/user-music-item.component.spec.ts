import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMusicItemComponent } from './user-music-item.component';

describe('UserMusicItemComponent', () => {
  let component: UserMusicItemComponent;
  let fixture: ComponentFixture<UserMusicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMusicItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMusicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
