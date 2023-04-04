import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { supportedRegion } from '../models/supported-lang';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

export class VoiceRecognitionServiceService {

  recognition = new webkitSpeechRecognition();
  boo = false;
  isStoppedSpeechRecog = false;
  isStartedSpeechRecog = false;
  public text = '';
  tempWords = '';
  speech: string = '';
  voice = '';

  settings: Subject<any> = new Subject();

  constructor(private _ngZone: NgZone) {
    this.init();
    this.settings.subscribe((setting) => {
      this.init(setting?.subLang);
    })
  }

  init(lang?: string) {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = lang || 'en-US';
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', () => {
      if (!this.isStoppedSpeechRecog) {
        this.wordConcat();
      }
    });
  }

  getTranscript({ locale = 'en-US' }: { locale?: string } = {}): Observable<string> {
    return new Observable(observer => {
      this.recognition.onresult = (speechRecognitionEvent: any) => {
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
      this.isStoppedSpeechRecog = false;
      this.isStartedSpeechRecog = true;
      return () => this.recognition.abort();
    });
  }

  recognize() {
    this.getTranscript()
      .subscribe(transcript => {
        if (transcript !== '' && this.boo) {
          this.voice = this.voice + ' ' + transcript;
        }
        else {
          this.speech = transcript;
        }
      });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.isStartedSpeechRecog = false;
    this.wordConcat();
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }

  getLanguageRegionById(id: number): any[] {
    return supportedRegion?.filter(langReg => langReg?.langId == id);
  }
}
