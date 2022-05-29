import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appChangeColorOfNumber]'
})
export class ChangeColorOfNumberDirective {
    @Input() set value(value: number) {
        this.clearColorClass();
        if (value === 0) {
            return;
        }

        const color = value > 0 ? 'green' : 'red';

        this.renderer2.addClass(this.el.nativeElement, `color__${color}`);
    }

    constructor(private el: ElementRef, private renderer2: Renderer2) {}

    private clearColorClass() {
        this.renderer2.removeClass(this.el.nativeElement, 'color__green');
        this.renderer2.removeClass(this.el.nativeElement, 'color__red');
    }
}
