import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-custom-info',
    templateUrl: './custom-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInfoComponent implements OnInit {
    @HostBinding('class')
    hostClass = 'd-block';

    @Input() label: string;

    @Input() value: string;

    @Input() valueAlignRight: boolean;

    @Input() className: string;

    @Input() type: 'table' | 'profile';

    @ViewChild('element', { static: true })
    private element: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.type) {
            this.renderer.addClass(this.element.nativeElement, `info--${this.type}`);
        }
    }
}
