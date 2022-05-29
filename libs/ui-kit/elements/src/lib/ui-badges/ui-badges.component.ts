import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Util } from '@scaleo/utils';

@Component({
    selector: 'ui-badges',
    template: `
        <div class="budges" [ngClass]="{ 'budges--one-fix': +content === 1 }" #budgesRef [hidden]="!content">
            {{ content }}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiBadgesComponent implements OnInit {
    @Input() content: any;

    @Input() color: string;

    @Input() className: string;

    @ViewChild('budgesRef', { static: true })
    set budgesRef(element: ElementRef) {
        if (element) {
            this._budgesRef = element;
        }
    }

    _budgesRef: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.color && this._budgesRef) {
            if (Util.isHexColor(this.color)) {
                this.renderer.setStyle(this._budgesRef.nativeElement, 'background-color', this.color);
            } else {
                this.renderer.addClass(this._budgesRef.nativeElement, this.color);
            }
        }

        if (this.className) {
            this.renderer.addClass(this._budgesRef.nativeElement, this.className);
        }
    }
}
