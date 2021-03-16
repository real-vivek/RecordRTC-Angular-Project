import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecordingToolComponent } from './recording-tool/recording-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordingToolComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
