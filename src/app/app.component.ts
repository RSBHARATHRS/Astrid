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

  dragPosition = {x: 0, y: 0};

  @HostListener('window:click', ['$event'])
  clickout(event: any) {
    console.log('window:click :', event);
    this.selectIdByEvent(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyDown(event: any) {
    console.log("keyup: ", event)
    if ((event.shiftKey && event.keyCode == 9) || event.keyCode == 9) {
      console.log('shift and tab');
      this.selectIdByEvent(event);
    } else if (event.keyCode == 27) { // 27 = Escape
      this.isVRStart = !this.isVRStart;
      this.isVRStart ? this.startService() : this.stopService();
    }
  }

  title = 'IDP-Speech-To-Text';
  boo = false;
  speech: string = '';
  voice = ''
  selectedId = '';
  isVRStart: boolean = false;

  constructor(private _ngZone: NgZone,
    public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialog: MatDialog) {

  }

  selectIdByEvent(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    // Get the id of the source element
    let elementId = element.id;
    console.log("active element ID:", elementId);
    if (elementId.startsWith('vr-ans')) {
      this.selectedId = elementId;
    }
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
        console.log(transcript, "res")
        if (transcript !== '' && this.voiceRecognitionServiceService.boo) {
          this.voice = this.voice + ' ' + transcript;
        }
        else {
          this.speech = transcript;
          console.log(this.selectedId, 'selectedId');
          let inputElement: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
          console.log(inputElement?.parentElement.id, 'idtest');
          if (inputElement.type == "select-one") {
            this.selectDropDownValue(inputElement?.options, transcript?.toLocaleLowerCase())
          } else if (inputElement.type == "radio") {
            console.log(inputElement.name, 'name12');
            this.selectRadioValue(inputElement.name, transcript?.toLocaleLowerCase());
          } else if (inputElement.type == 'checkbox') {
            let splitval = 'vr-div-' + this.selectedId.split('-')[2];
            this.selectCheckBoxValue(splitval, transcript?.toLocaleLowerCase());
          } else if (inputElement.type == 'datetime-local') {
            this.selectDateTime(transcript);
          }
          else {
            inputElement.value = transcript?.toLocaleLowerCase();
          }
        }
      });
  }

  selectDateTime(value: any) {
    let splitvalue = value.split(' ');
    console.log(splitvalue.length, 'length');
    if (splitvalue.length == 3) {
      let test: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
      test.value = this.datetimeLocal(splitvalue[0] + '-' + splitvalue[1] + '-' + splitvalue[2]);
    }
  }

  datetimeLocal(datetime: any) {
    console.log(datetime, 'datetime')
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    console.log(dt.toISOString().slice(0, 16), 'datetime123')
    return dt.toISOString().slice(0, 16);
  }

  selectCheckBoxValue(parentId: any, value: any) {
    let stringSimilarity = require("string-similarity");
    let itemForm: any = document.getElementById(parentId) as HTMLInputElement | null;; // getting the parent container of all the checkbox inputs
    let checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkBoxes.length; i++) {
      let selector = 'label[for=' + checkBoxes[i].id + ']';
      let label: any = document.querySelector(selector) as HTMLInputElement | null;
      // console.log(label.innerHTML,'innerHTML');
      let matchPer = stringSimilarity.compareTwoStrings(value, label.innerHTML?.toLocaleLowerCase());
      console.log(label.innerHTML?.toLocaleLowerCase(), '-', value, '-', matchPer, 'txcont');
      if (matchPer >= 0.8) {
        let test: any = document.getElementById(checkBoxes[i].id) as HTMLInputElement | null;
        console.log(test.checked, 'test.checked');
        test.checked = true;
      }
      //var text = label.innerHTML;
      // do stuff
    }
  }

  selectRadioValue(name: any, value: any) {
    let radios = document.getElementsByName(name);
    var stringSimilarity = require("string-similarity");
    console.log(radios, 'radios');
    for (var i = 0; i < radios.length; i++) {
      var selector = 'label[for=' + radios[i].id + ']';
      var label: any = document.querySelector(selector) as HTMLInputElement | null;
      // console.log(label.innerHTML,'innerHTML');
      let matchPer = stringSimilarity.compareTwoStrings(value, label.innerHTML?.toLocaleLowerCase());
      console.log(label.innerHTML?.toLocaleLowerCase(), '-', value, '-', matchPer, 'txcont');
      if (matchPer >= 0.8) {
        let test: any = document.getElementById(radios[i].id) as HTMLInputElement | null;
        test.checked = true;
      }
    }
  }

  selectDropDownValue(options: any, value: any) {
    var stringSimilarity = require("string-similarity");

    console.log(value, 'value123');
    for (var i = 0; i < options.length; i++) {
      let ele = options[i];
      let matchPer = stringSimilarity.compareTwoStrings(value, ele.textContent?.toLocaleLowerCase());
      console.log(ele.textContent, '-', value, 'txcont');
      console.log(matchPer, 'txvalue');
      if (matchPer >= 0.8) {
        console.log(ele.value, 'txvalue123');
        let test: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
        test.value = ele.value;
      }
    }
  }

  openInfo(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
    this.dialog.open(InfoComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogAni(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100'): void {
    this.dialog.open(SettingsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openMicTestingTool(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
    this.dialog.open(RecognitionTesterComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
