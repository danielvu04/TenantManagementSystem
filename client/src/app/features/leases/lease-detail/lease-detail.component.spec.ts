import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseDetailComponent } from './lease-detail.component';

describe('LeaseDetailComponent', () => {
  let component: LeaseDetailComponent;
  let fixture: ComponentFixture<LeaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
