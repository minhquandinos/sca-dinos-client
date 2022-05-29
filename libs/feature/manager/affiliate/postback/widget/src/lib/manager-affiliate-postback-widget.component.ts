import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, pluck, shareReplay, Subject, switchMap } from 'rxjs';
import { startWith, take, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseAffiliatePostbackWidgetComponent } from '@scaleo/affiliate/postback/common';
import { AffiliatePostbackListQueryParamsDto, PostbackLevelsEnums, PostbackListService } from '@scaleo/affiliate/postback/list/data-access';
import { ManagerPostbackCreateComponent } from '@scaleo/feature/manager/affiliate/postback/upsert/modal-form';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-postback-widget',
    templateUrl: './manager-affiliate-postback-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerAffiliatePostbackWidgetComponent extends BaseAffiliatePostbackWidgetComponent {
    @Input() set affiliateId(id: number) {
        this._affiliateId$.next(id);
    }

    @Input() linkToAllPostbacks = 'postbacks';

    @Input() isLoad: boolean;

    private _update$: Subject<void> = new Subject();

    private _affiliateId$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

    private _postbacks$ = this._update$.pipe(
        startWith(''),
        switchMap(() =>
            this._affiliateId$.pipe(
                filter((id) => !!id),
                switchMap((id) => {
                    const queryParams: AffiliatePostbackListQueryParamsDto = {
                        sortField: 'status',
                        sortDirection: 'desc'
                    };

                    return this.affiliatePostbackService.index(queryParams, id);
                }),
                tap(() => {
                    this.isLoad = true;
                })
            )
        ),
        shareReplay()
    );

    postbacks$ = this._postbacks$.pipe(pluck('results'));

    counts$ = this._postbacks$.pipe(pluck('pagination', 'total_count'));

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'level',
            translateSchema: 'table.column.level',
            width: '15%'
        },
        {
            value: 'offer',
            translateSchema: 'table.column.offer',
            width: '25%'
        },
        {
            value: 'status',
            translateSchema: 'table.column.conversion_status',
            width: '15%'
        },
        {
            value: 'postback',
            translateSchema: 'table.column.postback',
            width: '45%'
        }
    ];

    readonly postbackLevelsEnums = PostbackLevelsEnums;

    constructor(
        protected readonly modal3Service: Modal3Service,
        private readonly profileQuery: ProfileQuery,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        protected readonly translate: TranslateService,
        private readonly affiliatePostbackService: PostbackListService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(modal3Service, translate);
    }

    openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(ManagerPostbackCreateComponent, {
            data: {
                affiliateId: this._affiliateId$.value,
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this._update$.next();
            });
    }

    showInfo(template: TemplateRef<any>, title: string): void {
        this.modal3Service.info(template, {
            title: `affiliate.postback.${title.toLowerCase()}`
        });
    }
}
