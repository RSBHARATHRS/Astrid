import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechToTextComponent } from './components/speech-to-text/speech-to-text.component';

const routes: Routes = [
  {
    path: '',
    component: SpeechToTextComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoreRoutingModule { }
