import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPageHeaderComponent } from './album-page-header.component';

describe('AlbumPageHeaderComponent', () => {
  let component: AlbumPageHeaderComponent;
  let fixture: ComponentFixture<AlbumPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPageHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
