import { Directive, HostListener, Input } from '@angular/core';

import { DropdownEntityItemRefDirective } from './dropdown-entity-item-ref.directive';

@Directive({
    selector: '[uiDropdownEntityTriggerFor]',
    exportAs: 'uiDropdownEntityTriggerFor'
})
export class DropdownEntityTriggerForDirective {
    @Input() uiDropdownEntityTriggerFor: DropdownEntityItemRefDirective;

    @HostListener('mouseover', ['$event'])
    iconHover() {
        this.uiDropdownEntityTriggerFor?.setDisplay();
    }

    @HostListener('mouseout', ['$event'])
    iconOut() {
        this.uiDropdownEntityTriggerFor?.setNoneDisplay();
    }
}
