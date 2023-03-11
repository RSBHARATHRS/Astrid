import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

export class VoiceRecognitionServiceService {

  recognition = new webkitSpeechRecognition();
  boo = false;
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords = '';
  speech: string = '';
  voice = ''

  constructor(private _ngZone: NgZone) { }

  // init() {
  //   this.recognition.interimResults = true;
  //   this.recognition.lang = 'en-US';
  //   this.recognition.addEventListener('result', (e: any) => {
  //     const transcript = Array.from<any>(e.results)
  //       .map((result) =>{
  //         console.log(result, "result")
  //         return  result[0].transcript
  //       })
  //       .join('');
  //     this.tempWords = transcript;
  //     console.log(transcript);
  //   });
  // }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        // this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        // this.recognition.start();
      }
    });
  }

  getTranscript({ locale = 'en-US' }: { locale?: string } = {}): Observable<string> {
    return new Observable(observer => {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = locale;
      this.recognition.onresult = (speechRecognitionEvent:any) => {
        var interim_transcript = '';
        for (var i = speechRecognitionEvent.resultIndex; i < speechRecognitionEvent.results.length; ++i) {
          if (speechRecognitionEvent.results[i].isFinal) {
            this.boo = true;
            this._ngZone.run(() => observer.next(speechRecognitionEvent.results[i][0].transcript.trim()));
          }
          else {
            this.boo = false;
            interim_transcript += speechRecognitionEvent.results[i][0].transcript;
            this._ngZone.run(() => observer.next(interim_transcript.trim()));
          }
        }
      };
      this.recognition.start();
      return () => this.recognition.abort();
    });
  }

  recognize() {
    this.getTranscript()
      .subscribe(transcript => {
        if (transcript !== '' && this.boo) {
          this.voice = this.voice + ' '+ transcript;
        }
        else
        {
          this.speech = transcript;
        }
      });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
