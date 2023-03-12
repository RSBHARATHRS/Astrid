import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-tool',
  templateUrl: './drag-tool.component.html',
  styleUrls: ['./drag-tool.component.scss']
})
export class DragToolComponent {

  @Output() start = new EventEmitter<boolean>();
  @Output() stop = new EventEmitter<boolean>();

  clickStart(){
    console.log('clickStart');
    this.start.emit(true);
  }

  clickStop(){
    this.stop.emit(true);
  }
}
