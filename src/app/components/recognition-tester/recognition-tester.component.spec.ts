import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionTesterComponent } from './recognition-tester.component';

describe('RecognitionTesterComponent', () => {
  let component: RecognitionTesterComponent;
  let fixture: ComponentFixture<RecognitionTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionTesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
