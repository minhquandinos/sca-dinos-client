import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import {
    OfferPromoteWidgetItemsModel,
    OfferPromoteWidgetQuery
} from '@scaleo/feature-affiliate-dashboard-widgets-offer-promote-data-access';
import {
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderOfferConfigModel
} from '@scaleo/offer/link-builder/common';
import { TargetingLinkBuilderComponent } from '@scaleo/offer/targeting-link-builder/modal-form';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-promote-list',
    templateUrl: './offer-promote-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferPromoteListComponent implements OnInit, OnDestroy {
    items$: Observable<OfferPromoteWidgetItemsModel[]>;

    isLoadingItems$ = this.itemsQuery.selectLoading();

    unsubscribe: Subject<void> = new Subject<void>();

    headers: UiTableHeaderInterface[] = [
        {
            value: '',
            colWidth: '50%'
        },
        {
            value: '',
            colWidth: '30%'
        },
        {
            value: '',
            colWidth: '20%'
        }
    ];

    constructor(
        public shared: SharedMethodsService,
        private itemsQuery: OfferPromoteWidgetQuery,
        private readonly modal3: Modal3Service,
        private readonly profileQuery: ProfileQuery
    ) {}

    ngOnInit(): void {
        this.items$ = this.itemsQuery.selectAll();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    linkBuilderPopupHandler(offer: OfferPromoteWidgetItemsModel) {
        const config: Partial<TargetingLinkBuilderOfferConfigModel> = {
            type: TargetingLinkBuilderEnum.Default,
            id: offer.id,
            links: offer.links,
            creatives: offer.creatives,
            affiliateId: this.profileQuery.profile.id
        };

        const data: TargetingLinkBuilderInputDataModel = {
            trackingDomain: offer.trackingDomain.name,
            haveDeepLink: offer.hasDeepLinking,
            config
        };

        this.modal3.editForm<any, TargetingLinkBuilderInputDataModel>(TargetingLinkBuilderComponent, {
            data
        });
    }
}
