import { TestBed } from '@angular/core/testing';

import { VoiceRecognitionServiceService } from './voice-recognition-service.service';

describe('VoiceRecognitionServiceService', () => {
  let service: VoiceRecognitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceRecognitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
