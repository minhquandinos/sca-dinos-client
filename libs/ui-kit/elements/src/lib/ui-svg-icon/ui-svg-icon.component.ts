import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';

import { UiSvgIconAnimationType } from './types/ui-svg-icon.type';
import { UiSvgIconType } from './ui-svg-icon.model';

@Component({
    selector: 'ui-svg-icon',
    template: ` <svg #iconContainer class="custom-icon" [ngClass]="className">
        <use attr.xlink:href="assets/icons/ui.svg#{{ icon }}" />
    </svg>`
})
export class UiSvgIconComponent implements OnInit, AfterViewInit, OnDestroy {
    private _iconColor: string;

    private timeoutAnimation: number;

    @Input() icon: string;

    @Input() size: 10 | 12 | 14 | 16 | 18 | 20 | 24 | 22 | 32;

    @Input() customHeight: number;

    @Input() customWidth: number;

    @Input() className = '';

    @Input() iconType: UiSvgIconType = 'fill';

    @Input() withAnimation: UiSvgIconAnimationType;

    @Input() durationAnimation = 1000;

    @Input() set iconColor(value: string) {
        this._iconColor = value;
        if (value && this.iconContainer) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, this.iconType, value);
        }
    }

    @Input() iconColorHover: string;

    @ViewChild('iconContainer', { static: true }) iconContainer: ElementRef;

    @HostBinding('class') hostClass = 'ui-svg-icon d-inline-flex';

    @HostListener('mouseover', ['$event'])
    iconHover(): void {
        if (this.iconColorHover) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, this.iconType, this.iconColorHover);
        }
    }

    @HostListener('mouseout', ['$event'])
    iconOut(): void {
        if (this.iconColorHover && this._iconColor) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, this.iconType, this._iconColor);
        }

        if (this.iconColorHover && !this._iconColor) {
            this.renderer2.removeStyle(this.iconContainer.nativeElement, this.iconType);
        }
    }

    constructor(private renderer2: Renderer2) {}

    ngOnInit(): void {
        this.setIconColor();
        this.setIconType();
    }

    ngAfterViewInit(): void {
        this.addIconClass();
        this.setCustomHeightWidth();
    }

    ngOnDestroy() {
        if (this.timeoutAnimation) {
            clearTimeout(this.timeoutAnimation);
        }
    }

    startAnimation(): void {
        if (this.withAnimation) {
            const className = `custom-icon--animation-${this.withAnimation}`;
            this.renderer2.addClass(this.iconContainer.nativeElement, className);
            this.timeoutAnimation = setTimeout(() => {
                this.renderer2.removeClass(this.iconContainer.nativeElement, className);
            }, this.durationAnimation || 1000);
        }
    }

    private addIconClass() {
        if (this.size) {
            this.renderer2.addClass(this.iconContainer.nativeElement, `custom-icon__size--${this.size}`);
        }

        if (this.icon === 'delete') {
            this.renderer2.addClass(this.iconContainer.nativeElement, `custom-icon--delete`);
            this.renderer2.addClass(this.iconContainer.nativeElement, `cursor-pointer`);
        }
    }

    private setIconColor() {
        if (this._iconColor) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, this.iconType, this._iconColor);
        }
    }

    private setIconType() {
        if (this.iconType === 'stroke') {
            this.renderer2.addClass(this.iconContainer.nativeElement, 'custom-icon--stroke');
        } else {
            this.renderer2.addClass(this.iconContainer.nativeElement, 'custom-icon--fill');
        }
    }

    private setCustomHeightWidth(): void {
        if (this.customHeight) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, 'height', this.customHeight);
        }

        if (this.customWidth) {
            this.renderer2.setStyle(this.iconContainer.nativeElement, 'width', this.customWidth);
        }
    }
}
