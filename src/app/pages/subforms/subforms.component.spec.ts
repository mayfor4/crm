import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubformsComponent } from './subforms.component';

describe('SubformsComponent', () => {
  let component: SubformsComponent;
  let fixture: ComponentFixture<SubformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
