import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenComponent } from './zen.component';

describe('ZenComponent', () => {
  let component: ZenComponent;
  let fixture: ComponentFixture<ZenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
