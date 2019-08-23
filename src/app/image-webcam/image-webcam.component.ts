import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Prediction } from '../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tensorFlow from '@tensorflow/tfjs';

@Component({
  templateUrl: './image-webcam.html',
  styleUrls: ['./image-webcam.scss']
})
export class ImageWebcamComponent implements OnInit, AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef;

  predictions: Prediction[];

  model: any;
  loading = true;

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.model = await mobilenet.load();
    this.loading = false;

    setInterval(async () => {
      this.predictions = await this.model.classify(this.video.nativeElement);
      await tensorFlow.nextFrame();
    }, 3000);
  }

  async ngAfterViewInit() {
    const videoNativeElement = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoNativeElement.srcObject = stream;
        })
        .catch((error) => {
          console.log(`Streaming error: ${error.message || error.toString()}`);
        });
    }
  }
}
