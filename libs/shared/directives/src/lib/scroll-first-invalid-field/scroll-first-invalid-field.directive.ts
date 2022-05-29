import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appScrollFirstInvalidField]'
})
export class ScrollFirstInvalidFieldDirective {
    @Input() options: { focus?: boolean };

    constructor(private el: ElementRef) {}

    @HostListener('submit')
    submit() {
        const firstInvalidControl = this.el.nativeElement.querySelector('.ng-invalid');
        if (firstInvalidControl) {
            firstInvalidControl.scrollIntoView({ block: 'center', behavior: 'smooth' });
            if (this.options?.focus) {
                firstInvalidControl.focus();
            }
        }
    }
}
