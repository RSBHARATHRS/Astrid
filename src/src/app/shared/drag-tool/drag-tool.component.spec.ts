import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragToolComponent } from './drag-tool.component';

describe('DragToolComponent', () => {
  let component: DragToolComponent;
  let fixture: ComponentFixture<DragToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
