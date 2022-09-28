import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRouterComponent } from './info-router.component';

describe('InfoRouterComponent', () => {
  let component: InfoRouterComponent;
  let fixture: ComponentFixture<InfoRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
