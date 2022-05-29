import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

import { ScaleoStatusesType } from '@scaleo/platform/list/access-data';

import { statusColor2Creator } from '../const/status-color2.const';

@Directive({
    selector: '[appStatus2Color]'
})
export class StatusColor2Directive implements OnChanges {
    @Input() type: keyof Record<ScaleoStatusesType, string>;

    @Input('appStatus2Color') status: string | number;

    @Input() setContainerColor = true;

    @Output() statusColor: EventEmitter<string> = new EventEmitter();

    constructor(private readonly renderer: Renderer2, private readonly host: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { status } = changes;
        if (status?.currentValue && status.currentValue !== status.previousValue) {
            this.makeColor();
        }
    }

    private makeColor(): void {
        const status = statusColor2Creator(this.type, this.status);
        const color = status?.makeColor();

        this.statusColor.emit(color);

        if (color && this.setContainerColor) {
            this.renderer.setStyle(this.host.nativeElement, 'color', color);
        }
    }
}
