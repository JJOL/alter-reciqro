import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';

import { requestAnimationFrame, cancelAnimationFrame } from '../../core/platform/requestAnimationFrame.platform';

declare const jsQR: any;

const CAMERA_OPTIONS = {
  FACING_CAMERA: 'user',
  BACK_CAMERA: 'environment'
};

/**
 * Number of miliseconds in a period of timeout
 */
const MS_SEC = 1000;
/**
 * Frequency of image processing invocations per second.
 */
const PROCESS_FPS = 30;

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

  isActive: boolean;
  nextReqAnimationFrame: number;

  selectedCamera: string;

  deviceMediaInfo: any;


  reader: FileReader;

  // Video Element and Canvas Element
  @ViewChild('previewEl', { static: true }) videoEl;
  @ViewChild('canvasEl', { static: true }) canvasEl;
  @ViewChild('photoInEl', { static: true}) photoInEl;
  @ViewChild('photoDisplayEl', { static: true}) photoDisplayEl;

  @Output() readCode: EventEmitter<QRCodeEvent>;
  constructor() {
    this.readCode = new EventEmitter<QRCodeEvent>();
    this.isActive = false;
  }
  
  /**
   * User Story ID: M1NG6
   * Description: Selects default camera and loads stream
   */
  async ngOnInit() {
    this.isActive = false;
    // Activate Input Stream from default camera
    this.selectedCamera = CAMERA_OPTIONS.BACK_CAMERA;
    await this.gatherDeviceMediaInfo();

    this.loadCameraStream(this.makeVideoConstraints(this.selectedCamera));

    // Create File Reader for photos
    this.reader = new FileReader();
    this.reader.addEventListener('load', this.onPhotoRead.bind(this))
  }
  /**
   * Description: Load once device media stream information
   */
  async gatherDeviceMediaInfo() {
    let devices = await (await navigator.mediaDevices.enumerateDevices()).filter(device => 'videoinput' == device.kind);
    let availableConstrains = navigator.mediaDevices.getSupportedConstraints();

    if (!this.deviceMediaInfo) {
      this.deviceMediaInfo = {};
    }
    this.deviceMediaInfo.devices = devices;
    this.deviceMediaInfo.availableConstrains = availableConstrains;
  }
  /**
   * Description: Calculate necessary constraints for getting a video stream for selected camera
   * @param  {} selectedCamera
   * @returns any
   */
  makeVideoConstraints(selectedCamera): any {
    let devices = this.deviceMediaInfo.devices;
    let availableConstrains = this.deviceMediaInfo.availableConstrains;

    let isFrontCameraSelected = selectedCamera == CAMERA_OPTIONS.FACING_CAMERA;

    let constrains: any = {
      audio: false,
      video: true
    };

    if (devices.length > 1) {
      let selectedDeviceId =  isFrontCameraSelected ? devices[0].deviceId : devices[devices.length-1].deviceId;
      constrains.video = {
        mandatory: {
          sourceId: selectedDeviceId
        }
      }
    }
    if ('facingModel' in availableConstrains) {
      constrains.facingMode = 'environment';
    }
    
    return constrains;
  }

  /**
   * Description: Starts the camera stream is allowed and 
   * renders it to the video element
   */
  loadCameraStream(constraints) {
    this.shutdownCamera();

    let video = this.videoEl.nativeElement;
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)){
      alert('No se encontró acceso a las camaras del dispositivo!')
      return;
    }
    navigator.mediaDevices.getUserMedia(constraints as any)
        .then(stream => {
          this.stream = stream;

          video.srcObject = this.stream;
          video.setAttribute('playsinline', true);

          video.load();
          video.play();

          this.isActive = true;

          this.nextReqAnimationFrame = requestAnimationFrame(() => this.tick());
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
    // Turn Off Tick
    cancelAnimationFrame(this.nextReqAnimationFrame);
    this.isActive = false;
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
    console.log('Processing video stream. You know the deal.');
    this.processVideoImage();
    if (this.isActive) {
      setTimeout(() => {
        this.nextReqAnimationFrame = requestAnimationFrame(() => this.tick());
      }, MS_SEC / PROCESS_FPS);
      
    }
  }
  /**
   * Description: Gets the current live image and attems to process its qr code
   */
  processVideoImage() {
    let video  = this.videoEl.nativeElement;
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      this.processImage(video, video.videoWidth, video.videoHeight);
    } 
  }

  processImage(src: any, width: number, height: number) {
    let canvas = this.canvasEl.nativeElement;
    canvas.hidden = true;
    canvas.width = width;
    canvas.height = height;
    this.ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
    let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    let code = jsQR(imageData.data, width, height, {
      inversionAttempts: 'dontInvert',
    });
    if (code) {
      // Codigo QR Valid
      let url = code.data;
      // Mandar evento
      this.readCode.next({ url: url });
    }
  }

  /**
   * User Story ID: M1NG6
   * Description: Toggles the current camera to use another one
   */
  async onSwitchCamera() {
    this.selectedCamera = (CAMERA_OPTIONS.BACK_CAMERA == this.selectedCamera) 
                            ? CAMERA_OPTIONS.FACING_CAMERA
                            : CAMERA_OPTIONS.BACK_CAMERA;

    this.loadCameraStream(this.makeVideoConstraints(this.selectedCamera));
  }

  /**
   * Description: Called when the file reader has read input content
   * @param  {any} ev
   */
  onPhotoRead(fileReaderEvent: any) {
    this.photoDisplayEl.nativeElement.src = fileReaderEvent.target.result;
    requestAnimationFrame(this.onPhotoImgLoaded.bind(this));
  }

  /**
   * Description: Called when an image file input has new content
   */
  onPhotoInputChange() {
    let inputEl = this.photoInEl.nativeElement;
    if (inputEl.files && inputEl.files[0]) {
      this.reader.readAsDataURL(inputEl.files[0]);
    }
  }


  /**
   * Description: Called when img.src has loaded
   */
  onPhotoImgLoaded() {
    this.processImage(this.photoDisplayEl.nativeElement, 400, 400);
  }
}
