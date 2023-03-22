import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsComponent } from './components/settings/settings.component';
import { InfoComponent } from './components/info/info.component';
import { DragToolComponent } from './components/drag-tool/drag-tool.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DragToolComponent,
    SettingsComponent,
    InfoComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('voice-reg-tool', customElement);
  }

  ngDoBootstrap() {

  }
}
