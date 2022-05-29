import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, take } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseAffiliatePostbackWidgetComponent } from '@scaleo/affiliate/postback/common';
import { AffiliatePostbackListModel, PostbackLevelsEnums } from '@scaleo/affiliate/postback/list/data-access';
import { AffiliatePostbackUpsertComponent } from '@scaleo/feature/affiliate/tools/postbacks/upsert/modal-form';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-affiliate-offer-postback-widget',
    templateUrl: './affiliate-offer-profile-postbacks.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateOfferProfilePostbacksComponent extends BaseAffiliatePostbackWidgetComponent implements OnInit {
    @Input() postbacks: AffiliatePostbackListModel[];

    @Input() offerId: number;

    @Output()
    updated: EventEmitter<void> = new EventEmitter<void>();

    public readonly linkToAllPostbacks = `/affiliate/tools/postbacks/all`;

    readonly postbackLevelsEnums = PostbackLevelsEnums;

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

    canEditPostback = true;

    constructor(
        protected override readonly modal3Service: Modal3Service,
        protected override readonly translate: TranslateService,
        private readonly profileQuery: ProfileQuery,
        private readonly toastr: ToastrBarService,
        private readonly platformSettingsQuery: PlatformSettingsQuery
    ) {
        super(modal3Service, translate);
    }

    ngOnInit() {
        if (!+this.platformSettingsQuery.settings.aff_auto_approve_postbacks) {
            this.canEditPostback = false;
        }
    }

    openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(AffiliatePostbackUpsertComponent, {
            data: {
                editId: editId || null,
                offerId: this.offerId && !editId ? +this.offerId : null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.updated.emit();
            });
    }
}
