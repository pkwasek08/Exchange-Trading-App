import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBuyComponent } from './sell-buy.component';

describe('SellBuyComponent', () => {
  let component: SellBuyComponent;
  let fixture: ComponentFixture<SellBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
