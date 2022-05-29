import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[uiOldDropdown]'
})
export class DropdownDirective {
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();

    manageDropdown = false;

    private _manageDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly manageDropdown$ = this._manageDropdown$.asObservable();

    @HostListener('click')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openDropdown(eventData?: Event) {
        if (!this.manageDropdown) {
            this.renderer2.addClass(this.elementRef.nativeElement, 'show');
            this.renderer2.addClass(this.elementRef.nativeElement.children[1], 'show');
            this.manageDropdown = !this.manageDropdown;
            this.open.emit(true);
            this._manageDropdown$.next(true);
        } else {
            this.removeShowClass();
            this.open.emit(false);
        }
    }

    @HostListener('document:click', ['$event'])
    hideDropdown(event: any) {
        if (!this.elementRef.nativeElement.contains(event.target) && this.manageDropdown) {
            this.removeShowClass();
            this.open.emit(false);
        }
    }

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

    removeShowClass() {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'show');
        this.renderer2.removeClass(this.elementRef.nativeElement.children[1], 'show');
        this.manageDropdown = !this.manageDropdown;
        this._manageDropdown$.next(false);
    }
}
