import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { supportedLang, supportedRegion } from 'src/app/models/supported-lang';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

interface SettingsForm {
  size: FormControl<number>;
  lang?: FormControl<number>;
  subLang?: FormControl<string>;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  //https://medium.com/creative-technology-concepts-code/speech-recognition-and-translation-in-the-browser-960107f2fad2

  supportedLanguage = supportedLang;
  supportedRegion = supportedRegion;

  settingsForm: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    size: new FormControl(50, { nonNullable: true }),
    lang: new FormControl(11, { nonNullable: true }),
    subLang: new FormControl('en-IN', { nonNullable: true }),
  });

  constructor(public dialogRef: MatDialogRef<SettingsComponent>,
    public voiceRecognitionServiceService: VoiceRecognitionServiceService) {

  }

  ngOnInit(): void {
    this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(JSON.parse(localStorage.getItem("settings")!)?.lang || 11);
    if (localStorage.getItem("settings")) {
      this.settingsForm.setValue(JSON.parse(localStorage.getItem("settings")!));
    }
    this.settingsForm.valueChanges.pipe(debounceTime(100)).subscribe((settings) => {
      this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(Number(settings?.lang));
    })
  }

  reset() {
    this.settingsForm.reset();
  }

  saveSettings() {
    this.voiceRecognitionServiceService.settings.next(this.settingsForm?.value);
    localStorage.setItem("settings", JSON.stringify(this.settingsForm.value));
    this.dialogRef.close();
  }
}
