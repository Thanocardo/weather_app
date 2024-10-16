import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCitiesPageComponent } from './popular-cities-page.component';

describe('PopularCitiesPageComponent', () => {
  let component: PopularCitiesPageComponent;
  let fixture: ComponentFixture<PopularCitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCitiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
