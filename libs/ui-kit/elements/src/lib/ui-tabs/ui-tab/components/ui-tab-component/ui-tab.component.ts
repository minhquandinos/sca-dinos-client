import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { BaseTabComponent } from '../base-tab.component';

@Component({
    selector: 'ui-tabs',
    templateUrl: 'ui-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTabComponent extends BaseTabComponent implements AfterContentInit, AfterContentChecked {
    @HostBinding('class') hostClass = 'd-block w-100';

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    ngAfterContentChecked() {
        super.ngAfterContentChecked();
    }
}
