import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialsFormComponent } from './materials-form.component';

describe('MaterialsFormComponent', () => {
  let component: MaterialsFormComponent;
  let fixture: ComponentFixture<MaterialsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
