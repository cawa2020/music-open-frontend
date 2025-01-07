import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCoverComponent } from './full-cover.component';

describe('FullCoverComponent', () => {
  let component: FullCoverComponent;
  let fixture: ComponentFixture<FullCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
