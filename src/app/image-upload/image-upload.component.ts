import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Prediction } from '../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.scss']
})
export class ImageUploadComponent implements OnInit {
  imageSource: string;
  @ViewChild('uploadedImage', { static: false }) imageElement: ElementRef;

  predictions: Prediction[];

  model: any;
  loading = true;

  constructor() { }

  async ngOnInit() {
    this.model = await mobilenet.load();
    console.log(`Model loaded`);
    this.loading = false;
  }

  async onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSource = res.target.result;
        setTimeout(async () => {
          const imageNativeElement = this.imageElement.nativeElement;
          this.predictions = await this.model.classify(imageNativeElement);
          this.predictions.forEach((prediction) => {
            prediction.probability = prediction.probability * 100;
          });
          console.log(`Prediction: ${JSON.stringify(this.predictions, null, 2)}`);
        }, 10);
      };
    }
  }
}
