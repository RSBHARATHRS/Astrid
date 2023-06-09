import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { supportedLang, supportedRegion } from 'src/app/models/supported-lang';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

interface SettingsForm {
  lang: FormControl<string>;
  subLang: FormControl<string>;
}

@Component({
  selector: 'app-recognition-tester',
  templateUrl: './recognition-tester.component.html',
  styleUrls: ['./recognition-tester.component.scss'],
})

export class RecognitionTesterComponent implements OnInit {

  speech = '';
  voice = ''
  isVRStarted: boolean = false;
  isPlayClicked: boolean = false;
  supportedLanguage = supportedLang;
  supportedRegion = supportedRegion;

  settingsForm: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    lang: new FormControl('11', { nonNullable: true, validators: [Validators.required] }),
    subLang: new FormControl('en-IN', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialogRef: MatDialogRef<RecognitionTesterComponent>,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(Number(JSON.parse(localStorage.getItem("settings")!)?.lang) || 11);
    if (localStorage.getItem("settings")) {
      let formData = JSON.parse(localStorage.getItem("settings")!)
      this.settingsForm.setValue({ lang: formData?.lang, subLang: formData?.subLang });
    }
    this.settingsForm.controls.lang.valueChanges.subscribe((value) => {
      this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(Number(value));
      this.settingsForm.controls.subLang.setValue(this.supportedRegion[0]?.code);
    });
    this.settingsForm.valueChanges.subscribe(() => {
      this.stopService()
    })
  }

  startService() {
    this.isPlayClicked = true;
    if (this.settingsForm.invalid)
      return
    this.isVRStarted = true;
    this.updateSettings();
    this.recognize();
  }

  stopService() {
    if (this.isVRStarted) {
      this.isVRStarted = false;
      this.voiceRecognitionServiceService.stop();
    }
  }

  updateSettings() {
    this.voiceRecognitionServiceService.settings.next(this.settingsForm?.value);
    let size = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')!)?.size : '';
    localStorage.setItem("settings", JSON.stringify({ size: size, ...this.settingsForm.value }));
  }

  recognize() {
    this.voiceRecognitionServiceService.getTranscript()
      .subscribe(transcript => {
        if (transcript !== '' && this.voiceRecognitionServiceService.boo) {
          this.voice = this.voice + ' ' + transcript;
        }
        else {
          this.speech = transcript;
        }
        this.cdRef.detectChanges();
      });
  }

  close() {
    this.stopService();
    this.dialogRef.close();
  }

}
