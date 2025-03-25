import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RWebinarComponent } from './r-webinar.component';

describe('RWebinarComponent', () => {
  let component: RWebinarComponent;
  let fixture: ComponentFixture<RWebinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RWebinarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
