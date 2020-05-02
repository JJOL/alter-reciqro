import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';

import { requestAnimationFrame } from '../../core/platform/requestAnimationFrame.platform';

declare const jsQR: any;

const CAMERA_OPTIONS = {
  FACING_CAMERA: 'user',
  BACK_CAMERA: 'environment'
};

/**
 * QRCodeEvent
 * Description: Emitted Event when a QR Code has successfully been scanned with its information.
 */
export interface QRCodeEvent {
  url: string
}

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
/**
 * QrscannerComponent
 * Description: QRScannerComponent that scans a live image stream from a camera and
 * detects when a valid QR code is processed.
 * User Story ID: M1NG6
 */
export class QrscannerComponent implements OnInit, OnDestroy {

  // Stream and Render
  ctx: any;
  stream: MediaStream;
  platformOnTickFn: (cbFn: () => void) => void;

  selectedCamera: string;

  // Video Element and Canvas Element
  @ViewChild('previewEl', { static: true }) videoEl;
  @ViewChild('canvasEl', { static: true }) canvasEl;

  @Output() readCode: EventEmitter<QRCodeEvent>;
  constructor() {
    this.readCode = new EventEmitter<QRCodeEvent>();
  }
  
  /**
   * User Story ID: M1NG6
   * Description: Selects default camera and loads stream
   */
  ngOnInit() {

    // Activate Input Stream from default camera
    this.selectedCamera = CAMERA_OPTIONS.BACK_CAMERA;
    this.loadCameraStream();
  }

  /**
   * Description: Starts the camera stream is allowed and 
   * renders it to the video element
   */
  loadCameraStream() {
    this.shutdownCamera();

    let video = this.videoEl.nativeElement;
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)){
      alert('No se encontró acceso a las camaras del dispositivo!')
      return;
    }
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: this.selectedCamera
      }
    })
    .then(stream => {
      this.stream = stream;

      video.srcObject = this.stream;
      video.setAttribute("playsinline", true);

      video.load();
      video.play();

      requestAnimationFrame(() => this.tick());
    })
    .catch(err => {
      //TODO: Handle User Doesnt Give Permission or no camera available.
      console.error(err);
    });
  }


  /**
   * Description: Stops the stream when the component is destroyed, no longer used.
   */
  ngOnDestroy() {
    this.shutdownCamera();
  }
  /**
   * Description: Stops the stream of the camera
   */
  shutdownCamera() {
    this.videoEl.nativeElement.pause();
    if (this.stream) {
      this.stream.getTracks()
      .forEach(track => {
        track.stop();
      });
    }
  }
  /**
   * Description: Clocked tick to process live image when possible
   */
  tick() {
    this.processVideoImage();
    requestAnimationFrame(() => this.tick());
  }
  /**
   * Description: Gets the current live image and attems to process its qr code
   */
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
        this.readCode.next({ url: url });
      }
    } 
  }

  /**
   * User Story ID: M1NG6
   * Description: Toggles the current camera to use another one
   */
  onSwitchCamera() {
    this.selectedCamera = (CAMERA_OPTIONS.BACK_CAMERA == this.selectedCamera) 
                            ? CAMERA_OPTIONS.FACING_CAMERA
                            : CAMERA_OPTIONS.BACK_CAMERA;


    this.loadCameraStream();
  }

}
