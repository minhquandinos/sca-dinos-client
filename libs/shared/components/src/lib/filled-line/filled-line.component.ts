import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-filled-line',
    templateUrl: './filled-line.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilledLineComponent implements OnChanges {
    @ViewChild('full', { static: true }) private full: ElementRef;
    @ViewChild('blank', { static: true }) private blank: ElementRef;

    @Input() maxValue: number;
    @Input() revenue: number;

    constructor(private renderer2: Renderer2) {}

    ngOnChanges() {
        const revenueAsPercentage = this.revenue / (this.maxValue / 100);
        this.setWidthForLine(revenueAsPercentage);
    }

    private setWidthForLine(width: number) {
        width = width ? width : 0;
        this.renderer2.setStyle(this.full.nativeElement, 'width', width + '%');
        this.renderer2.setStyle(this.blank.nativeElement, 'width', 100 - width + '%');
    }
}
