import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertorsComponent } from './convertors.component';

describe('ConvertorsComponent', () => {
  let component: ConvertorsComponent;
  let fixture: ComponentFixture<ConvertorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertorsComponent]
    });
    fixture = TestBed.createComponent(ConvertorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
