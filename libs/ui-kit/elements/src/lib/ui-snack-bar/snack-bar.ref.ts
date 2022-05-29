import { OverlayRef } from '@angular/cdk/overlay/overlay-ref';

export class SnackBarRef {
    constructor(private readonly overlay: OverlayRef) {}

    close() {
        this.overlay.detach();
    }

    isVisible() {
        return this.overlay && this.overlay.overlayElement;
    }

    getPosition() {
        return this.overlay.overlayElement.getBoundingClientRect();
    }

    getElementRef(): HTMLElement {
        return this.overlay.overlayElement;
    }
}
