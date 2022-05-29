import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { DropdownEntityComponent } from '@scaleo/ui-kit/components/dropdown-entity';
import { ButtonType } from '@scaleo/ui-kit/elements';

import { UiButtonLinkComponent } from '../ui-button-link/ui-button-link.component';
import { DropdownEntityMenuModel } from './dropdown-entity-menu.model';

@Component({
    selector: 'ui-dropdown-entity-menu',
    templateUrl: './dropdown-entity-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownEntityMenuComponent {
    @Input() label: string;

    @Input() menu: DropdownEntityMenuModel[];

    @Input() buttonType: ButtonType = 'text';

    @Input() buttonIcon: string;

    @Input() className: string;

    @Input() dropWidth = 160;

    @Input() dropdownItemTemplate: TemplateRef<any>;

    @Input() classNameList: string;

    @Input() classNameListItem: string;

    @Input() rightDropdownMenu = true;

    // TODO refactor
    @Input() buttonIconSize: 12 | 14 | 16 | 18 | 20 | 22 | 32;

    @ViewChild(DropdownEntityComponent) dropdownEntityMenu: DropdownEntityComponent;

    @ViewChild(UiButtonLinkComponent) buttonLinkComponent: UiButtonLinkComponent;

    constructor(private cdr: ChangeDetectorRef) {}

    action(element: DropdownEntityMenuModel) {
        this.dropdownEntityMenu.open();
        return element.action();
    }

    markForCheck(): void {
        this.cdr.markForCheck();
    }
}
