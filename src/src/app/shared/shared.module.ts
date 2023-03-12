import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragToolComponent } from './drag-tool/drag-tool.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [DragToolComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports:[
    DragToolComponent
  ]
})


export class SharedModule { }
