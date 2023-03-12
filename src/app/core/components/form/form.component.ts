import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { VoiceRecognitionServiceService } from '../../services/voice-recognition-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  boo = false;
  speech: string = '';
  voice = ''
  selectedId = '';
  isVRStart: boolean = false;

  @HostListener('window:click', ['$event'])
  clickout(event: any) {
    console.log(event, 'event12');
    this.selectIdByEvent(event);
  }

  @HostListener('keyup', ['$event'])
  onKeyDown(e: any) {
    if ((e.shiftKey && e.keyCode == 9) || e.keyCode == 9) {
      console.log('shift and tab');
      this.selectIdByEvent(e);
    } else if (e.keyCode == 27) {
      this.isVRStart = !this.isVRStart;
      this.isVRStart ? this.startService() : this.stopService();
    }
  }

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    private cdRef: ChangeDetectorRef) {
    // this.voiceRecognitionServiceService.init();
  }

  selectIdByEvent(event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    // Get the id of the source element
    let elementId = element.id;
    console.log(elementId, 'elementId');
    if (elementId.startsWith('vr-ans')) {
      this.selectedId = elementId;
    }
  }

  startService() {
    // alert('hi');
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
          console.log(this.selectedId, 'id12');
          let test: any = document.getElementById(this.selectedId) as HTMLInputElement | null;
          console.log(test, 'idtest');
          test.value = transcript;
        }
        this.cdRef.detectChanges();
      });
  }

  cancel() {

  }

  signUp() {

  }

}
