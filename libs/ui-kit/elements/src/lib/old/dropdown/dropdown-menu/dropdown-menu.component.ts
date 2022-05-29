import { AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ButtonType } from '../../../ui-button-link';
import { AbstractDropdownComponent } from '../abstract-dropdown.component';
import { DropdownDirective } from '../dropdown.directive';

export interface DropDownMenuInterface {
    title: string;
    action: () => any;
    value?: string;
    selected?: boolean;
}

/**
 * @deprecated this component should not be used
 */
@Component({
    selector: 'ui-old-dropdown-menu',
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent extends AbstractDropdownComponent implements OnInit, AfterViewInit {
    @Input() label: string;

    @Input() buttonType: ButtonType = 'floating';

    @Input() elements: DropDownMenuInterface[];

    @Input() className = '';

    @Input() hideSelected = false;

    @Input() scroll: boolean;

    @Input() icon = 'down';

    // @ViewChild('dropdownRef') dropdownRef: ElementRef;

    @ViewChild(DropdownDirective) dropdownDirective: DropdownDirective;

    constructor(protected renderer: Renderer2) {
        super(renderer);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        if (this.scroll) {
            this.renderer.addClass(this.dropdownRef.nativeElement, 'dropdown--menu-scroll');
        }
    }
}
