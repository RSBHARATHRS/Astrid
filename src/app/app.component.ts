import { Component, HostListener, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './components/info/info.component';
import { RecognitionTesterComponent } from './components/recognition-tester/recognition-tester.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VoiceRecognitionServiceService } from './services/voice-recognition-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  dragPosition = { x: 0, y: 0 };

  @HostListener('window:click', ['$event'])
  clickout(event: any) {
    this.selectIdByEvent(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyDown(event: any) {
    if ((event.shiftKey && event.keyCode == 9) || event.keyCode == 9) {
      this.selectIdByEvent(event);
    } else if (event.keyCode == 27) { // 27 = Escape
      this.isVRStart = !this.isVRStart;
      this.isVRStart ? this.startService() : this.stopService();
    }
  }

  title = 'astrid-tool';
  boo = false;
  speech: string = '';
  voice = ''
  selectedId = '';
  isVRStart: boolean = false;

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialog: MatDialog) { }

  selectIdByEvent(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    // Get the id of the source element
    console.log(element, "element");
    let elementId = element.id;
    if(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      this.selectedId = elementId;
    }
    // if (elementId.startsWith('vr-ans')) {
    //   this.selectedId = elementId;
    // }
  }

  startService() {
    this.isVRStart = true;
    this.recognize();
  }

  stopService() {
    this.isVRStart = false;
    this.voiceRecognitionServiceService.stop();
  }

  recognize() {
    this.voiceRecognitionServiceService.getTranscript()
      .subscribe(transcript => {
        if (transcript !== '' && this.voiceRecognitionServiceService.boo) {
          this.voice = this.voice + ' ' + transcript;
        }
        else {
          this.speech = transcript;
          let inputElement: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
          if (inputElement.type == "select-one") {
            this.selectDropDownValue(inputElement?.options, transcript?.toLocaleLowerCase())
          } else if (inputElement.type == "radio") {
            this.selectRadioValue(inputElement.name, transcript?.toLocaleLowerCase());
          } else if (inputElement.type == 'checkbox') {
            let splitval = 'vr-div-' + this.selectedId.split('-')[2];
            this.selectCheckBoxValue(splitval, transcript?.toLocaleLowerCase());
          } else if (inputElement.type == 'datetime-local') {
            this.selectDateTime(transcript);
          } else if (inputElement.type == 'email') {
            inputElement.value = transcript?.toLocaleLowerCase()?.replace(/\s/g, "");
          }
          else {
            inputElement.value = transcript?.toLocaleLowerCase();
          }
        }
      });
  }

  selectDateTime(value: any) {
    let splitvalue = value.split(' ');
    if (splitvalue.length == 3) {
      let test: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
      test.value = this.datetimeLocal(splitvalue[0] + '-' + splitvalue[1] + '-' + splitvalue[2]);
    }
  }

  datetimeLocal(datetime: any) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
  }

  selectCheckBoxValue(parentId: any, value: any) {
    let stringSimilarity = require("string-similarity");
    let itemForm: any = document.getElementById(parentId) as HTMLInputElement | null;; // getting the parent container of all the checkbox inputs
    let checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkBoxes.length; i++) {
      let selector = 'label[for=' + checkBoxes[i].id + ']';
      let label: any = document.querySelector(selector) as HTMLInputElement | null;
      let matchPer = stringSimilarity.compareTwoStrings(value, label.innerHTML?.toLocaleLowerCase());
      if (matchPer >= 0.8) {
        let test: any = document.getElementById(checkBoxes[i].id) as HTMLInputElement | null;
        test.checked = true;
      }
    }
  }

  selectRadioValue(name: any, value: any) {
    let radios = document.getElementsByName(name);
    var stringSimilarity = require("string-similarity");
    for (var i = 0; i < radios.length; i++) {
      var selector = 'label[for=' + radios[i].id + ']';
      var label: any = document.querySelector(selector) as HTMLInputElement | null;
      let matchPer = stringSimilarity.compareTwoStrings(value, label.innerHTML?.toLocaleLowerCase());
      if (matchPer >= 0.8) {
        let test: any = document.getElementById(radios[i].id) as HTMLInputElement | null;
        test.checked = true;
      }
    }
  }

  selectDropDownValue(options: any, value: any) {
    var stringSimilarity = require("string-similarity");
    for (var i = 0; i < options.length; i++) {
      let ele = options[i];
      let matchPer = stringSimilarity.compareTwoStrings(value, ele.textContent?.toLocaleLowerCase());
      if (matchPer >= 0.8) {
        let test: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
        test.value = ele.value;
      }
    }
  }

  openTestingTool(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
    this.dialog.open(RecognitionTesterComponent, {
      backdropClass: 'bg',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSettingsDialog(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
    this.dialog.open(SettingsComponent, {
      backdropClass: 'bg',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openInfo(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
    this.dialog.open(InfoComponent, {
      backdropClass: 'bg',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
