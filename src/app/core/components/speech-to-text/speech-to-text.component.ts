import { Component } from '@angular/core';
import { VoiceRecognitionServiceService } from '../../services/voice-recognition-service.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss']
})
export class SpeechToTextComponent {

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService) {
    this.voiceRecognitionServiceService.init();
  }

  startService(){
    this.voiceRecognitionServiceService.start()
  }

  stopService(){
    this.voiceRecognitionServiceService.stop()
  }
}
