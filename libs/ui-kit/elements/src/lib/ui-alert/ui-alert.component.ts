import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ui-alert',
    templateUrl: './ui-alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiAlertComponent {
    @Input() templateCustom: TemplateRef<any>;
    @Input() templateContent: TemplateRef<any>;
    @Input() bg: 'danger' | 'error' | 'success' | 'info';
    @Input() borderColor: 'danger' | 'error' | 'success' | 'info';
    @Input() size: 'small' | 'medium' | 'large';
    @Input() close: true;
    @Input() className = '';

    @HostBinding('class') hostClass = 'ui-test d-block';

    @ViewChild('elementRef') set elementRef(element: ElementRef) {
        if (element) {
            if (this.borderColor) {
                this.renderer.addClass(element.nativeElement, `ui-alert--${this.borderColor}`);
            }
            if (this.size) {
                this.renderer.addClass(element.nativeElement, `ui-alert--size-${this.size}`);
            }
            if (this.bg) {
                this.renderer.addClass(element.nativeElement, `ui-alert--bg-${this.bg}`);
            }
        }
    }

    constructor(private renderer: Renderer2) {}
}
