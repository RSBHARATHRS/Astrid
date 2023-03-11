import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { VoiceRecognitionServiceService } from 'src/app/core/services/voice-recognition-service.service';

@Component({
  selector: 'app-recognition-tester',
  templateUrl: './recognition-tester.component.html',
  styleUrls: ['./recognition-tester.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecognitionTesterComponent {

  boo = false;
  speech: string = '';
  voice = ''

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    private cdRef: ChangeDetectorRef) {
  // this.voiceRecognitionServiceService.init();
}

startService(){
  this.recognize();
}

stopService(){
  this.voiceRecognitionServiceService.stop();
}

recognize() {
  this.voiceRecognitionServiceService.getTranscript()
    .subscribe(transcript => {
      console.log(transcript, "res")
      if (transcript !== '' && this.voiceRecognitionServiceService.boo) {
        this.voice = this.voice + ' '+ transcript;
      }
      else
      {
        this.speech = transcript;
      }
      this.cdRef.detectChanges();
    });
}

}
