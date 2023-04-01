import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { supportedLang, supportedRegion } from 'src/app/models/supported-lang';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

interface SettingsForm {
  size: FormControl<number>;
  lang: FormControl<string>;
  subLang: FormControl<string>;
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
  isSaveClicked: boolean = false;

  settingsForm: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    size: new FormControl(50, { nonNullable: true }),
    lang: new FormControl('11', { nonNullable: true, validators: [Validators.required] }),
    subLang: new FormControl('en-IN', { nonNullable: true,  validators: [Validators.required] }),
  });

  constructor(public dialogRef: MatDialogRef<SettingsComponent>,
    public voiceRecognitionServiceService: VoiceRecognitionServiceService) {

  }

  ngOnInit(): void {
    this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(Number(JSON.parse(localStorage.getItem("settings")!)?.lang) || 11);
    if (localStorage.getItem("settings")) {
      this.settingsForm.setValue(JSON.parse(localStorage.getItem("settings")!));
    }
    this.settingsForm.controls.lang.valueChanges.subscribe((language)=>{
      this.supportedRegion = this.voiceRecognitionServiceService.getLanguageRegionById(Number(language));
      this.settingsForm.controls.subLang.setValue(this.supportedRegion[0]?.code);
    });
  }

  reset() {
    this.settingsForm.reset();
  }

  saveSettings() {
    this.isSaveClicked = true;
    if(this.settingsForm.invalid)
     return;
    this.voiceRecognitionServiceService.settings.next(this.settingsForm?.value);
    localStorage.setItem("settings", JSON.stringify(this.settingsForm.value));
    this.dialogRef.close();
  }
}
