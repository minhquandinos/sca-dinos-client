import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html'
})
export class ImageCropperComponent implements OnInit {
    public imageBase64: any;

    public image: string;

    @Input() width: number = null;

    @Input() height: number = null;

    @Input() ratio: any = 1;

    @Input() aspectRatio = true;

    @Input() cropperMinHeight = 0;

    @Input() cropperMinWidth = 0;

    @Input() disabled = false;

    @Input() hideResizeSquares = false;

    @Input() onlyScaleDown = false;

    @Output() imageWasCropped: EventEmitter<string> = new EventEmitter<string>();

    @Output() cancelCropped: EventEmitter<string> = new EventEmitter<string>();

    private _validation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly validation$ = this._validation$.asObservable();

    constructor() {}

    ngOnInit(): void {}

    imageCropped(event: ImageCroppedEvent) {
        this.image = event.base64;
    }

    saveCropImage() {
        this.imageBase64 = null;
        this.imageWasCropped.emit(this.image);
    }

    cancelCropImage() {
        this.imageBase64 = null;
        this.cancelCropped.emit();
    }

    selectedFile(event: string | ArrayBuffer | File) {
        this.imageBase64 = event;
        if (this.validationStatus) {
            this.toggleValidationStatus(false);
        }
    }

    invalidSelectedFile(event: boolean) {
        this.imageBase64 = null;
        this.toggleValidationStatus(event);
    }

    private toggleValidationStatus(status: boolean): void {
        this._validation$.next(status);
    }

    private get validationStatus(): boolean {
        return this._validation$.value;
    }
}
