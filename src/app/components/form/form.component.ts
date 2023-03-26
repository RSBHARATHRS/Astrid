import { Component} from '@angular/core';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService) {
  }

  // cancel() {

  // }

  // signUp() {

  // }

}
