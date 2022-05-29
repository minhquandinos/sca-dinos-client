import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild
} from '@angular/core';

import { Util } from '@scaleo/utils';

@Component({
    selector: 'ui-chip',
    template: `
        <div class="marker d-flex align-items-center justify-content-center" [ngClass]="className" #marker>
            <ng-content></ng-content>
            <span *ngIf="close" class="marker__close d-flex">
                <ui-svg-icon className="ng-value-icon" aria-hidden="true" icon="remove-tag" [size]="24" (click)="onClose()"> </ui-svg-icon>
            </span>
        </div>
    `
})
export class UiChipComponent implements OnInit, OnChanges {
    @Input() color = 'light-gray';

    @Input() noColor: boolean;

    @Input() colorText: string;

    @Input() size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'small';

    @Input() rounded: boolean;

    @Input() close: boolean;

    @Input() className = '';

    @Output() closed: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('marker', { static: true })
    private _marker: ElementRef;

    @HostBinding('class') hostClass = 'ui-chip';

    private _bgColorClassName: string;

    private _textColorClassName: string;

    constructor(private renderer2: Renderer2) {}

    ngOnInit(): void {
        this.initBgColor(this.color);
        this.initColorText(this.colorText);

        const marker = this._marker.nativeElement;

        this.renderer2.addClass(marker, `marker--${this.size}`);
        if (this.rounded) {
            this.renderer2.addClass(marker, `marker--rounded`);
        }
        if (this.noColor) {
            this.renderer2.addClass(marker, `marker--no-background`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { color, colorText } = changes;

        if (color?.currentValue || colorText?.currentValue) {
            this.initBgColor(color?.previousValue);
            this.initColorText(colorText?.previousValue);
        }
    }

    onClose() {
        this.closed.emit();
    }

    private initBgColor(previousBgColor: string) {
        const element = this._marker.nativeElement;
        if (Util.isHexColor(this.color)) {
            this.renderer2.setStyle(element, 'background-color', this.color);
        } else {
            if (previousBgColor) {
                this.renderer2.removeClass(element, `bg__${previousBgColor}`);
            }
            this.renderer2.addClass(element, `bg__${this.color}`);
            this._bgColorClassName = this.color;
        }
    }

    private initColorText(previousTextColor: string) {
        const element = this._marker.nativeElement;
        if (this.colorText) {
            if (Util.isHexColor(this.colorText)) {
                this.renderer2.setStyle(element, 'color', this.colorText);
            } else {
                if (previousTextColor) {
                    this.renderer2.removeClass(element, `color__${previousTextColor}`);
                }
                this.renderer2.addClass(element, `color__${this.colorText}`);
                this._textColorClassName = this.colorText;
            }
        }
    }
}
