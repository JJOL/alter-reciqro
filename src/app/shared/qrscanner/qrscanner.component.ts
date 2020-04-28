import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import jsQR from 'jsqr';

import { requestAnimationFrame } from '../../core/platform/requestAnimationFrame.platform';




export interface QRCodeEvent {
  url: string
}

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QrscannerComponent implements OnInit, OnDestroy {

  ctx: any;
  stream: MediaStream;

  platformOnTickFn: (cbFn: () => void) => void;

  @ViewChild('previewEl', { static: true }) videoEl;
  @ViewChild('canvasEl', { static: true }) canvasEl;

  @Output() readCode: EventEmitter<QRCodeEvent>;
  constructor() {
    this.readCode = new EventEmitter<QRCodeEvent>();
  }

  ngOnInit() {

    let video = this.videoEl.nativeElement;
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(stream => {
      this.stream = stream;
      video.srcObject = this.stream;
      video.setAttribute("playsinline", true);
      video.play();

      requestAnimationFrame(() => this.processVideoImage());
    })
    .catch(err => {
      //TODO: Handle User Doesnt Give Permission or no camera available.
      console.error(err);
    });

  }

  ngOnDestroy() {
    this.shutdownCamera();
  }

  processVideoImage() {
    let canvas = this.canvasEl.nativeElement;
    let video  = this.videoEl.nativeElement;
    canvas.hidden = true;
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      this.ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

      let code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        // Codigo QR Valid
        let url = code.data;
        // Mandar evento
        this.readCode.next({
          url: url
        });
        
      }
    }
    requestAnimationFrame(() => this.processVideoImage());
  }

  shutdownCamera() {
    if (this.stream) {
      this.stream.getTracks()
      .forEach(track => {
        track.stop();
      });
    }
  }

}
