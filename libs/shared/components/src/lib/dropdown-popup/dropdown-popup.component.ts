import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { DropdownDirective } from '../../../../../ui-kit/elements/src/lib/old/dropdown/dropdown.directive';

@Component({
    selector: 'app-dropdown-popup',
    templateUrl: './dropdown-popup.component.html',
    styleUrls: ['./dropdown-popup.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class DropdownPopupComponent {
    @Input() label: string;

    @Input() count: number;

    @Input() className = '';

    @Input() dropdownId: string;

    @ViewChild(DropdownDirective) dropdownDirective: DropdownDirective;

    @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

    show = false;

    @ViewChild('dropdownRef') dropdownRef: ElementRef;

    @HostListener('document:click', ['$event'])
    clickOut(event) {
        if (!this.dropdownRef.nativeElement.contains(event.target) && this.show) {
            this.show = false;
        }
    }

    applyFilter() {
        this.toggle.emit();
        this.dropdownDirective.removeShowClass();
    }
}
