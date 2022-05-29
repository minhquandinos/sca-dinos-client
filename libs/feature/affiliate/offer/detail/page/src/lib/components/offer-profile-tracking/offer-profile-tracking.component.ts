import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { DefaultManagerService } from '@scaleo/account/service';
import { AffiliateAccessOfferViewModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import { OfferCreativeInterface, OfferViewModel } from '@scaleo/offer/common';
import {
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderOfferConfigModel
} from '@scaleo/offer/link-builder/common';
import { TargetingLinkBuilderComponent } from '@scaleo/offer/targeting-link-builder/modal-form';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-offer-tracking-old-widget',
    templateUrl: './offer-profile-tracking.component.html',
    providers: [DefaultManagerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferProfileTrackingComponent implements OnDestroy {
    @Input() set offerInfo(data: OfferViewModel | AffiliateAccessOfferViewModel) {
        if (data) {
            this.offerData = data;
        }
    }

    @ViewChild('infoTemplate') infoTemplate: TemplateRef<HTMLElement>;

    mapOptionalParam: string[] = [
        'aff_click_id',
        'sub_id1',
        'sub_id2',
        'sub_id3',
        'sub_id4',
        'sub_id5',
        'aff_param1',
        'aff_param2',
        'aff_param3',
        'aff_param4',
        'aff_param5',
        'link_id',
        'deep_link',
        'creative_id',
        'idfa',
        'gaid'
    ];

    failForwarding: string;

    readonly affIdInfo: number;

    offerData: OfferViewModel | AffiliateAccessOfferViewModel;

    private unsubscribe: Subject<void> = new Subject<void>();

    @HostBinding('class') hostClass = 'offer-profile-tracking';

    constructor(
        private readonly translate: TranslateService,
        private readonly modal3Service: Modal3Service,
        private readonly defaultManagerService: DefaultManagerService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.affIdInfo = this.defaultManagerService?.id;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public showInfo() {
        this.modal3Service.info(this.infoTemplate, {
            title: this.translate.instant('offers_page.tracking.form.additional_parameters')
        });
    }

    openLinkBuilder() {
        const { id: defaultLinkId = undefined } =
            (this.offerData.links as OfferLandingPageModel[]).find((elem) => elem.type === OfferUrlsTypeIdEnum.Default) || {};

        const config: TargetingLinkBuilderOfferConfigModel = {
            type: TargetingLinkBuilderEnum.Default,
            id: this.offerData.id,
            links: this.offerData.links,
            creatives: this.offerData.creatives as OfferCreativeInterface[],
            defaultLinkId: defaultLinkId,
            affiliateId: this.affIdInfo,
            isAffiliateAccess: true
        };

        const data: TargetingLinkBuilderInputDataModel = {
            trackingDomain: this.offerData.tracking_domain.name,
            haveDeepLink: Boolean(this.offerData.deep_linking),
            config
        };

        this.modal3Service.editForm<any, TargetingLinkBuilderInputDataModel>(TargetingLinkBuilderComponent, {
            data
        });
    }
}
