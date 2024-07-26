import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePageCompoment } from './base-page.component';

describe('BasePageComponent', () => {
  let component: BasePageCompoment;
  let fixture: ComponentFixture<BasePageCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePageCompoment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasePageCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
