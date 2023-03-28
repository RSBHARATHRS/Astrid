import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

interface SettingsForm {
  size: FormControl<string>;
  vocal?: FormControl<string>;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup<SettingsForm> = new FormGroup<SettingsForm>({
    size: new FormControl('', { nonNullable: true }),
    vocal: new FormControl('', { nonNullable: true }),
  });

  constructor(public dialogRef: MatDialogRef<SettingsComponent>,
    public voiceRecognitionServiceService: VoiceRecognitionServiceService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("settings")) {
      this.settingsForm.setValue(JSON.parse(localStorage.getItem("settings")!));
    }
  }

  saveSettings() {
    this.voiceRecognitionServiceService.settings.next(this.settingsForm?.value);
    localStorage.setItem("settings", JSON.stringify(this.settingsForm.value));
    this.dialogRef.close();
  }
}
