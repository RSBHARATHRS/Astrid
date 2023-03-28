import { EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
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

export class DragToolComponent implements OnInit {

  @Input() isVRRcord: boolean = false;
  @Input() dragPosition: any = { x: 0, y: 0 };

  height: number = 50;
  width: number = 50;

  updatedValue: number = 10;

  @Output() start = new EventEmitter<boolean>();
  @Output() stop = new EventEmitter<boolean>();
  @Output() openSettingsEvent = new EventEmitter<any>();
  @Output() openTestingToolEvent = new EventEmitter<any>();
  @Output() openInfo = new EventEmitter<any>();

  constructor(public voiceRecognitionServiceService: VoiceRecognitionServiceService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.updatedValue = JSON.parse(localStorage.getItem("settings")!)?.size;
    this.voiceRecognitionServiceService.settings.subscribe((value)=>{
      this.updatedValue = value?.size;
    })
  }

  clickStart() {
    console.log('clickStart');
    this.start.emit(true);
  }

  clickStop() {
    this.stop.emit(true);
  }

  openSettings() {
    this.openSettingsEvent.emit();
  }


  openMicTestingTool() {
    const dialogRef = this.dialog.open(RecognitionTesterComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
