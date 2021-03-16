import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingToolComponent } from './recording-tool.component';

describe('RecordingToolComponent', () => {
  let component: RecordingToolComponent;
  let fixture: ComponentFixture<RecordingToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
