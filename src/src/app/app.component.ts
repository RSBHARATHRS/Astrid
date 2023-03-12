import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  title = 'IDP-Speech-To-Text';
  boo = false;
  speech: string = '';
  voice = ''

  constructor(private _ngZone: NgZone) {

  }

  // getTranscript({ locale = 'en-US' }: { locale?: string } = {}): Observable<string> {
  //   return new Observable(observer => {
  //     const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  //     const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  //     const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  //     // const SpeechRecognition = window['webkitSpeechRecognition'];
  //     const speechRecognition = new SpeechRecognition();
  //     speechRecognition.continuous = true;
  //     speechRecognition.interimResults = true;
  //     speechRecognition.lang = locale;
  //     speechRecognition.onresult = (speechRecognitionEvent) => {
  //       var interim_transcript = '';
  //       for (var i = speechRecognitionEvent.resultIndex; i < speechRecognitionEvent.results.length; ++i) {
  //         if (speechRecognitionEvent.results[i].isFinal) {
  //           this.boo = true;
  //           this._ngZone.run(() => observer.next(speechRecognitionEvent.results[i][0].transcript.trim()));
  //         }
  //         else {
  //           this.boo = false;
  //           interim_transcript += speechRecognitionEvent.results[i][0].transcript;
  //           this._ngZone.run(() => observer.next(interim_transcript.trim()));
  //         }

  //       }
  //     };
  //     speechRecognition.start();

  //     return () => speechRecognition.abort();
  //   });
  // }

  // recognize() {
  //   this.getTranscript()
  //     .subscribe(transcript => {
  //       if (transcript !== '' && this.boo) {
  //         this.voice = this.voice + ' '+ transcript;
  //       }
  //       else
  //       {
  //         this.speech = transcript
  //       }
  //     });
  // }
}
