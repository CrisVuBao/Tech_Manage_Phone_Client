import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeStatusComponent } from './pipe-status.component';

describe('PipeStatusComponent', () => {
  let component: PipeStatusComponent;
  let fixture: ComponentFixture<PipeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
