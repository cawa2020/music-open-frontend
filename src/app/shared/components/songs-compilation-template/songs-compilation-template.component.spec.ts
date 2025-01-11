import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsCompilationTemplateComponent } from './songs-compilation-template.component';

describe('SongsCompilationTemplateComponent', () => {
  let component: SongsCompilationTemplateComponent;
  let fixture: ComponentFixture<SongsCompilationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsCompilationTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsCompilationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
