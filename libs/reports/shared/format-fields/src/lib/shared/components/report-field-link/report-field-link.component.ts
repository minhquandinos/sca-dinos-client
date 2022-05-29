import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, pluck, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormatPipe } from '@scaleo/platform/format/pipe';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { StatisticDefaultRowModel } from '@scaleo/reports/common';
import { HyperlinkModel, NavigateRootService } from '@scaleo/shared/components';

import { BaseReportFieldLinkComponent } from '../base-report-field-link.component';

@Component({
    selector: 'app-report-field-link',
    templateUrl: './report-field-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatPipe]
})
export class ReportFieldLinkComponent extends BaseReportFieldLinkComponent<StatisticDefaultRowModel> implements OnInit {
    item$: Observable<HyperlinkModel> = of(null);

    hasTitle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    hasUrl$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    additionalClass = 'field-with-long-name';

    constructor(
        protected navigateRootService: NavigateRootService,
        protected checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) protected readonly permissions: PlatformPermissionsType,
        private formatPipe: FormatPipe
    ) {
        super(navigateRootService, checkPermissionService, permissions);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (this.field && !this.field?.id) {
            const value = this.field.value as string;
            const id: number = this.getId(value);

            this.setField({
                id,
                value: this.getValue(value, id) as string
            });
        }

        this.item$ = this.link(this.key, { id: this.field?.id, value: this.field?.value }).pipe(
            map((hyperlink) => {
                if (!hyperlink) {
                    return null;
                }
                return {
                    link: hyperlink.link,
                    title: this.formatPipe.transform(`${hyperlink.id} ${hyperlink.title}`, 'idName')
                };
            }),
            tap((hyperlink) => {
                this.hasTitle$.next(!!hyperlink?.title);
                this.hasUrl$.next(!!hyperlink?.link);
            })
        );
    }
}
