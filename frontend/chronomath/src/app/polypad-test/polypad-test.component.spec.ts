import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolypadTestComponent } from './polypad-test.component';

describe('PolypadTestComponent', () => {
  let component: PolypadTestComponent;
  let fixture: ComponentFixture<PolypadTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolypadTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolypadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
