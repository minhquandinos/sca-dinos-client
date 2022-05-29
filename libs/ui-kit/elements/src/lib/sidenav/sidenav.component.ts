import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BaseNavGroupModel, BaseNavModel } from '@scaleo/shared/data';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnChanges {
    @HostBinding('class') hostClass = 'sidenav';

    @Input() navigations: BaseNavModel[] | BaseNavGroupModel[] = [];

    isGroup: boolean;

    isSingle: boolean;

    isProjectionContent: boolean;

    ngOnChanges(changes: SimpleChanges) {
        const { navigations } = changes;

        if (navigations?.currentValue?.length) {
            this.isGroup = navigations?.currentValue.every((elem: BaseNavGroupModel) => !!elem?.items?.length);
            this.isSingle = !this.isGroup;
        } else {
            this.isProjectionContent = true;
        }
    }

    trackByFn(index: number): number {
        return index;
    }
}
