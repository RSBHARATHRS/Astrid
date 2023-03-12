import { ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { VoiceRecognitionServiceService } from 'src/app/core/services/voice-recognition-service.service';

@Component({
  selector: 'app-drag-tool',
  templateUrl: './drag-tool.component.html',
  styleUrls: ['./drag-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragToolComponent {

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    private cdRef: ChangeDetectorRef) {

  }

  @Output() start = new EventEmitter<boolean>();
  @Output() stop = new EventEmitter<boolean>();

  clickStart(){
    console.log('clickStart');
    this.start.emit(true);
    this.cdRef.detectChanges();
  }

  clickStop(){

    this.stop.emit(true);
    this.cdRef.detectChanges();
  }
}
