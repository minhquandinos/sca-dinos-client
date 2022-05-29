import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ManagerAffiliatesAccessPageService } from '@scaleo/feature/manager/affiliate/services';
import { PlatformCountsAffiliateModel, PlatformCountsService } from '@scaleo/platform/counts/data-access';

@Component({
    selector: 'scaleo-manager-affiliates-navigation',
    templateUrl: './manager-affiliates-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerAffiliatesNavigationComponent {
    @HostBinding('class') hostClass = 'd-flex w-100';

    private _navCounts$: Observable<PlatformCountsAffiliateModel> = this.platformCountsService.counts$.pipe(
        map((counts) => counts?.affiliates || {})
    );

    readonly total$ = this._navCounts$.pipe(pluck('total'));

    readonly my$ = this._navCounts$.pipe(pluck('assigned'));

    readonly pending$ = this._navCounts$.pipe(pluck('pending'));

    readonly showAllTab$: Observable<boolean> = this.accessPage.showAllPage$;

    readonly showMyTab$: Observable<boolean> = this.accessPage.showMyPage$;

    constructor(
        private readonly platformCountsService: PlatformCountsService,
        private readonly accessPage: ManagerAffiliatesAccessPageService
    ) {}
}
