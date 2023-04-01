import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { supportedLang, supportedRegion } from 'src/app/models/supported-lang';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

interface SettingsForm {
  lang?: FormControl<string>;
  subLang?: FormControl<string>;
}

@Component({
  selector: 'app-recognition-tester',
  templateUrl: './recognition-tester.component.html',
  styleUrls: ['./recognition-tester.component.scss'],
})

export class RecognitionTesterComponent {

  speech = '';
  voice = ''
  isVRStarted: boolean = false;
  supportedLanguage = supportedLang;
  supportedRegion = supportedRegion;

  settingsForm: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    lang: new FormControl('English', { nonNullable: true }),
    subLang: new FormControl('', { nonNullable: true }),
  });

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialogRef: MatDialogRef<RecognitionTesterComponent>,
    private cdRef: ChangeDetectorRef) {
  }

  startService() {
    this.isVRStarted = true;
    this.recognize();
  }

  stopService() {
    this.isVRStarted = false;
    this.voiceRecognitionServiceService.stop();
  }

  recognize() {
    this.voiceRecognitionServiceService.getTranscript()
      .subscribe(transcript => {
        console.log(transcript, "res")
        if (transcript !== '' && this.voiceRecognitionServiceService.boo) {
          this.voice = this.voice + ' ' + transcript;
        }
        else {
          this.speech = transcript;
        }
        this.cdRef.detectChanges();
      });
  }

}
