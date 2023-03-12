import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecognitionTesterComponent } from './recognition-tester/recognition-tester.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module'
// import {SpeechToTextComponent} from '../core/components/speech-to-text/speech-to-text.component'


@NgModule({
  declarations: [
    RecognitionTesterComponent,
    
    //SpeechToTextComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    RecognitionTesterComponent,
   // SpeechToTextComponent
  ]
})

export class FeaturesModule { }
