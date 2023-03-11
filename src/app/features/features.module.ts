import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecognitionTesterComponent } from './recognition-tester/recognition-tester.component';



@NgModule({
  declarations: [
    RecognitionTesterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecognitionTesterComponent
  ]
})

export class FeaturesModule { }
