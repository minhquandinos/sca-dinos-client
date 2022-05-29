import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appWordWrapStringLength]'
})
export class StringLengthDirective implements OnInit {
    @Input() string: string;

    @Input() limit = 100;

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

    ngOnInit(): void {
        if (this.string && this.string.length > this.limit) {
            this.renderer2.addClass(this.elementRef.nativeElement, 'word-wrap');
        } else {
            this.renderer2.addClass(this.elementRef.nativeElement, 'text-nowrap');
        }
    }
}
