import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropertiesFormComponent } from './properties-form.component';

describe('PropertiesFormComponent', () => {
  let component: PropertiesFormComponent;
  let fixture: ComponentFixture<PropertiesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PropertiesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
