import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FormatPipe } from '@scaleo/platform/format/pipe';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

import { BaseReportFieldLinkRelation2Component } from '../base-report-field-link-relation2.component';

@Component({
    selector: 'app-report-field-link-relation2-goal',
    templateUrl: './report-field-link-relation2-goal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatPipe]
})
export class ReportFieldLinkRelation2GoalComponent extends BaseReportFieldLinkRelation2Component implements OnInit {
    linkLabel$ = this.setLabel('table.column.goal');

    constructor(
        protected translate: TranslateService,
        private formatPipe: FormatPipe,
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly checkPermissionService: CheckPermissionService
    ) {
        super(translate, permissions);
    }

    ngOnInit(): void {
        super.ngOnInit();
        const parentLink = this.navigateRootService.path(`/offers/${this.field?.parent_id}`);
        this.setHyperlink(this.roleLink, parentLink, this.formatPipe, this.canAccessOffers);
    }

    get roleLink(): string {
        const path = this.navigateRootService.path(`/offers`);
        if (this.canAccessOffers) {
            return `${path}/${this.field?.parent_id}`;
        }

        return `${path}/${this.field?.parent_id}`;
    }

    private get canAccessOffers(): boolean {
        return this.checkPermissionService.check(this.permissions.canAccessOffers);
    }
}
