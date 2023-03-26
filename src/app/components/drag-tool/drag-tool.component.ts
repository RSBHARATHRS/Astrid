import { EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoiceRecognitionServiceService } from 'src/app/services/voice-recognition-service.service';
import { RecognitionTesterComponent } from '../recognition-tester/recognition-tester.component';

@Component({
  selector: 'app-drag-tool',
  templateUrl: './drag-tool.component.html',
  styleUrls: ['./drag-tool.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class DragToolComponent {

  @Input() isVRRcord: boolean = false;
  @Input() dragPosition: any = {x: 0, y: 0};


  @Output() start = new EventEmitter<boolean>();
  @Output() stop = new EventEmitter<boolean>();
  @Output() openSettingsEvent = new EventEmitter<any>();
  @Output() openTestingToolEvent = new EventEmitter<any>();
  @Output() openInfoEvent = new EventEmitter<any>();

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialog: MatDialog,) {

  }

  clickStart(){
    console.log('clickStart');
    this.start.emit(true);
    // this.cdRef.detectChanges();
  }

  clickStop(){

    this.stop.emit(true);
    // this.cdRef.detectChanges();
  }

  // openMicTestingTool() {
  //   this.openTestingToolEvent.emit();
  // }

  openSettings() {
    this.openSettingsEvent.emit();
  }

  openInfo() {
    this.openInfoEvent.emit();
  }

  // openMicTestingTool(enterAnimationDuration: string = '100', exitAnimationDuration: string = '100') {
  //   this.dialog.open(RecognitionTesterComponent, {
  //     width: '10px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  openMicTestingTool() {
    const dialogRef = this.dialog.open(RecognitionTesterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
