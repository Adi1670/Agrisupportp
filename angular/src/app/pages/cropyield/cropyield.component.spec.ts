import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropyieldComponent } from './cropyield.component';

describe('CropyieldComponent', () => {
  let component: CropyieldComponent;
  let fixture: ComponentFixture<CropyieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropyieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropyieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
