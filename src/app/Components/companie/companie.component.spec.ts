import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanieComponent } from './companie.component';

describe('CompanieComponent', () => {
  let component: CompanieComponent;
  let fixture: ComponentFixture<CompanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
