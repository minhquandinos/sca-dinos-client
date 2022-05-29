import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { PanelLayoutService } from '@scaleo/ui-kit/layout';

@Component({
    selector: 'shared-layout-assigned-managers',
    templateUrl: './assigned-managers.component.html',
    styleUrls: ['./assigned-managers.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AssignedManagersComponent {
    readonly managers$: Observable<any[]> = this.profileQuery.profile$.pipe(
        pluck('managers_assigned'),
        map((managers) => {
            return managers?.map((manager: any) => ({
                ...manager,
                image: this.pathFileService.platformImage(manager.image),
                contacts: JSON.parse(manager.contacts)
            }));
        })
    );

    readonly showManagers$: Observable<boolean> = this.managers$.pipe(map((managers) => !!managers.length));

    collapseMenu$ = this.panelLayoutService.collapseMenu$;

    constructor(
        private readonly pathFileService: PathFileService,
        private readonly panelLayoutService: PanelLayoutService,
        private readonly profileQuery: ProfileQuery
    ) {}
}
