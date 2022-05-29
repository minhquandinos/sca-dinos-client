import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferTrackingSettingsEditComponent } from '@scaleo/feature/manager/offer/tracking/settings/upsert/modal-form';
import {
    OFFER_TRACKING_SETTINGS_PROVIDER,
    OfferTrackingSettingsInputDataModel,
    OfferTrackingSettingsModel,
    OfferTrackingSettingsQuery,
    OfferTrackingSettingsService
} from '@scaleo/feature/manager/offer/tracking/settings/view-info/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-offer-tracking-settings',
    templateUrl: './offer-tracking-settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_TRACKING_SETTINGS_PROVIDER]
})
export class OfferTrackingSettingsComponent implements OnInit, OnDestroy {
    readonly data$ = this.query.data$;

    readonly id = this.offerDetailQuery.id;

    readonly trackingDomain$ = this.getTrackingDomain$;

    readonly globalPostbackLink$ = this.query.globalPostbackLink$;

    readonly invalidTrafficForwardingViewData$ = this.query.invalidTrafficForwardingViewData$;

    readonly isRequirePostbackToken$ = this.platformSettingsQuery.settings$.pipe(pluck('advertiser_token_for_postback'));

    constructor(
        private readonly query: OfferTrackingSettingsQuery,
        private readonly service: OfferTrackingSettingsService,
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly modal3: Modal3Service,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.view();
    }

    ngOnDestroy() {
        this.service.resetStore();
    }

    edit(): void {
        const inputData: OfferTrackingSettingsInputDataModel = {
            id: this.id,
            settings: this.query.data
        };

        const modal = this.modal3.editForm<OfferTrackingSettingsModel, OfferTrackingSettingsInputDataModel>(
            OfferTrackingSettingsEditComponent,
            {
                data: inputData
            }
        ).afterClosed$;

        modal.toPromise().then(({ data }) => {
            if (data) {
                this.service.updateStore(data);
            }
        });
    }

    private view(): void {
        this.service.view(this.id).then();
    }

    private get getTrackingDomain$(): Observable<string> {
        return this.query.trackingDomain$.pipe(map((domain: string) => domain.replace('https://', '')));
    }
}
