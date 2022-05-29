import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { METRIC_COLORS_MAP, MetricEnum } from '@scaleo/reports/common';

@Directive({
    selector: '[appPerformanceMetricColor]'
})
export class PerformanceMetricColorDirective implements OnInit {
    @Input() firstMetric: MetricEnum;

    @Input() secondMetric: MetricEnum;

    @Input() color: string;

    @Input() value: MetricEnum;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        const { nativeElement } = this.el;

        this.renderer.removeStyle(nativeElement, 'opacity');

        if (!this.value) {
            this.renderer.setStyle(nativeElement, 'opacity', 0.3);
            this.renderer.setStyle(nativeElement, 'background', METRIC_COLORS_MAP[this.firstMetric]);
        } else if (this.color) {
            this.renderer.setStyle(nativeElement, 'background', this.color);
        } else {
            if (this.firstMetric && !this.secondMetric) {
                this.renderer.setStyle(nativeElement, 'opacity', 0.3);
            }

            const metric = this.secondMetric ? this.secondMetric : this.firstMetric;
            this.renderer.setStyle(nativeElement, 'background', METRIC_COLORS_MAP[metric]);
        }
    }
}
