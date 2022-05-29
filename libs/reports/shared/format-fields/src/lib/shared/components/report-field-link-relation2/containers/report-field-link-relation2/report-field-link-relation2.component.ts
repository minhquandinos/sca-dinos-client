import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ContainerRef } from 'ngx-infinite-scroll';

import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { StatisticRowRelationModel } from '@scaleo/reports/common';
import { NavigateRootService } from '@scaleo/shared/components';

import { BaseReportFieldLinkComponent } from '../../../base-report-field-link.component';
import { ReportFieldLinkRelation2CreativeComponent } from '../../components/report-field-link-relation2-creative/report-field-link-relation2-creative.component';
import { ReportFieldLinkRelation2GoalComponent } from '../../components/report-field-link-relation2-goal/report-field-link-relation2-goal.component';
import { ReportFieldLinkRelation2LinkComponent } from '../../components/report-field-link-relation2-link/report-field-link-relation2-link.component';

@Component({
    selector: 'app-report-field-link-relation2',
    template: `<span class="text-pre-wrap"><ng-template #containerRef></ng-template></span>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldLinkRelation2Component
    extends BaseReportFieldLinkComponent<StatisticRowRelationModel>
    implements OnInit, OnDestroy
{
    @ViewChild('containerRef', { read: ViewContainerRef, static: true }) containerRef: ContainerRef;

    constructor(
        protected navigateRootService: NavigateRootService,
        protected checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(navigateRootService, checkPermissionService, permissions);
    }

    ngOnInit(): void {
        this.prepareField();
        this.factory();
    }

    ngOnDestroy() {
        this.containerRef.clear();
    }

    private factory() {
        switch (this.key) {
            case 'goal':
                this.createComponent(ReportFieldLinkRelation2GoalComponent);
                break;
            case 'link':
                this.createComponent(ReportFieldLinkRelation2LinkComponent);
                break;
            case 'creative':
                this.createComponent(ReportFieldLinkRelation2CreativeComponent);
                break;
            default:
                this.containerRef.clear();
                break;
        }
    }

    private createComponent(component: Type<any>) {
        const container = this.containerRef.createComponent(component);
        container.instance.field = this.field;
        container.instance.reportType = this.reportType;
        container.changeDetectorRef.detectChanges();
    }

    private prepareField() {
        if (this.field && !this.field?.id) {
            const value = this.field.value as string;
            const id: number = this.getId(value);

            let parentValue;
            let parentId;
            if (this.checkPermissionService.check(this.permissions.canAccessOffers)) {
                parentValue = this._item['offer'] as string;
                parentId = this.getId(parentValue);
            }

            this.setField({
                id,
                value: this.getValue(value, id) as string,
                parent_id: parentId,
                parent_value: this.getValue(parentValue, parentId) as string
            });
        }
    }
}
