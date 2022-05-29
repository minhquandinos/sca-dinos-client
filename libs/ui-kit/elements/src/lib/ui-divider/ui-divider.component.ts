import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Util } from '@scaleo/utils';

import { UiDividerEnum } from './ui-divider.enum';
import { UiDividerType } from './ui-divider.type';

@Component({
    selector: 'ui-divider',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiDividerComponent implements OnInit {
    @HostBinding('class') hostClass = 'ui-divider';

    @Input() orientation: UiDividerType = UiDividerEnum.Horizontal;

    @Input() set height(value: string) {
        if (value) {
            this.renderer.setStyle(this.hostRef.nativeElement, 'height', value);
        }
    }

    @Input() set width(value: string) {
        if (value) {
            this.renderer.setStyle(this.hostRef.nativeElement, 'width', value);
        }
    }

    @Input() set color(value: string) {
        if (value) {
            if (Util.isHexColor(value)) {
                this.renderer.setStyle(this.hostRef.nativeElement, 'background', value);
            } else {
                this.renderer.addClass(this.hostRef.nativeElement, value);
            }
        }
    }

    @ViewChild('elementRef', { static: true }) elementRef: ElementRef;

    constructor(private renderer: Renderer2, private hostRef: ElementRef) {}

    ngOnInit(): void {
        this.renderer.addClass(this.hostRef.nativeElement, `ui-divider--${this.orientation}`);
    }
}
