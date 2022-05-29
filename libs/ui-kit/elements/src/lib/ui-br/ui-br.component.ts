import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'ui-br',
    template: ` <div class="custom-br" #brRef></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiBrComponent implements AfterViewInit {
    @Input() height = 64;

    @ViewChild('brRef') brRef: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.renderer.setStyle(this.brRef.nativeElement, 'height', `${this.height}px`);
    }
}
