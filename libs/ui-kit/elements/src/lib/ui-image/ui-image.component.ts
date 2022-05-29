import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { UiImageRoundingType, UiImageSizeType } from './ui-image.type';

@Component({
    selector: 'ui-image',
    templateUrl: './ui-image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiImageComponent implements OnInit {
    @Input() image: string;

    @Input() type: UiImageRoundingType = 'circle';

    @Input() size: UiImageSizeType = 'medium';

    @Input() width: number;

    @Input() height: number;

    @ViewChild('imageRef', { static: true }) imageRef: ElementRef;

    @HostBinding('class') hostClass = 'ui-image';

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.width) {
            this.renderer.setAttribute(this.imageRef.nativeElement, 'width', `${this.width}px`);
        }
        if (this.height) {
            this.renderer.setAttribute(this.imageRef.nativeElement, 'height', `${this.height}px`);
        }
    }

    public get typeImageClass(): string {
        return this.type === 'rounded' ? 'rounded' : 'rounded-circle';
    }

    public get sizeImageClass(): string {
        return '';
    }
}
