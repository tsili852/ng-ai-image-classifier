import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageWebcamComponent } from './image-webcam/image-webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    ImageWebcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
