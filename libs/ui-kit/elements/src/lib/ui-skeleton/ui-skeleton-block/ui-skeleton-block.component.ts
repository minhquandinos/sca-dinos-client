import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

// TODO refactor this component and style
@Component({
    selector: 'ui-skeleton-block',
    templateUrl: './ui-skeleton-block.component.html',
    styleUrls: ['./ui-skeleton-block.component.css']
})
export class UiSkeletonBlockComponent implements OnInit {
    @Input() size: 'large' | 'medium' | 'small' = 'medium';

    @Input() height: 'medium' | 'large' | 'big';

    @Input() width: 25 | 50 | 75 | 100;

    @Input() className: string;

    @Input() customHeight: number;

    @Input() customWidth: number;

    public cssClass: string;

    @ViewChild('skeletonContainer', { static: true }) skeletonContainer: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.cssClass = this.className;

        if (this.height) {
            this.cssClass += ` skeleton--height-${this.height}`;
        }

        if (this.width && !this.customWidth) {
            this.cssClass += ` w-${this.width}`;
        }

        if (this.customWidth) {
            this.renderer.setStyle(this.skeletonContainer.nativeElement, 'width', `${this.customWidth}`);
            this.renderer.setStyle(this.skeletonContainer.nativeElement, 'min-width', `${this.customWidth}`);
        }

        if (this.customHeight) {
            this.renderer.setStyle(this.skeletonContainer.nativeElement, 'height', `${this.customHeight}`);
        }
    }
}
