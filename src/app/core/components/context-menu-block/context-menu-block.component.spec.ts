import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightClickBlockComponent } from './context-menu-block.component';

describe('RightClickBlockComponent', () => {
  let component: RightClickBlockComponent;
  let fixture: ComponentFixture<RightClickBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightClickBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightClickBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
