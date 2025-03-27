import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCampaignsComponent } from './loyalty-campaigns.component';

describe('LoyaltyCampaignsComponent', () => {
  let component: LoyaltyCampaignsComponent;
  let fixture: ComponentFixture<LoyaltyCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoyaltyCampaignsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
