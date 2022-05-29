import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { TrackingDomainsInterface } from '@scaleo/offer/common';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';
import { fileUtil } from '@scaleo/utils';

import { CreativesConverterClass } from './classes/creatives-converter.class';
import { OfferProfileCreativesService } from './offer-profile-creatives.service';

@Component({
    selector: 'scaleo-offer-creative-old-widget',
    templateUrl: './offer-profile-creatives.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreativesConverterClass]
})
export class OfferProfileCreativesComponent implements OnDestroy {
    // TODO fixed any to AffiliateOfferCreativeModel[]
    @Input() set creatives([creatives, tracking]: [any[], TrackingDomainsInterface]) {
        if (creatives && tracking) {
            this.countCreatives = creatives.length;
            this.creativesList = creatives.slice(0, this.limit ? this.limit : this.countCreatives).map((creative) => {
                const affiliateId = this.affiliateId ? String(this.affiliateId) : null;
                return {
                    ...this.converter.convertHTMLCode(creative, affiliateId, tracking, this.platformSettingsQuery.settings.track_url),
                    image: this.pathFileService.platformImage(creative.image, 'creatives')
                } as any;
            });
        }
    }

    @Input() affiliateId: number = null;

    @Input() offerId: number;

    @Input() limit: number;

    @Input() rowTemplate: TemplateRef<any>;

    @Input() headers: UiTableHeaderInterface[];

    @Output() updated: EventEmitter<void> = new EventEmitter<void>();

    private unsubscribe: Subject<void> = new Subject<void>();

    countCreatives: number;

    creativesList: any[]; // TODO fixed model AffiliateOfferCreativeModel[]

    readonly tableHeadersForCreatives: UiTableHeaderInterface[] = [
        {
            value: 'title',
            key: 'title',
            translateKey: 'table.column.title',
            colWidth: '28%'
        },
        {
            value: 'type',
            key: 'type',
            translateKey: 'table.column.type',
            colWidth: '13%'
        },
        {
            value: 'preview',
            key: 'preview',
            translateKey: 'table.column.preview'
        },
        {
            value: 'tracking_url',
            key: 'tracking_url',
            translateKey: 'table.column.tracking_url'
        },
        {
            value: 'html_code',
            key: 'html_code',
            translateKey: 'table.column.html_code'
        }
    ];

    public creativeIdForLoadingXMLFile: number;

    constructor(
        private modal3: Modal3Service,
        private converter: CreativesConverterClass,
        private translate: TranslateService,
        private offerProfileCreativesService: OfferProfileCreativesService,
        private cdr: ChangeDetectorRef,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly pathFileService: PathFileService
    ) {}

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public showInfo(type: 'preview' | 'tracking' | 'html', template: TemplateRef<any>): void {
        const titleMap: BaseObjectModel = {
            preview: this.translate.instant('table.column.preview'),
            tracking: this.translate.instant('table.column.tracking_url'),
            html: this.translate.instant('table.column.html_code')
        };

        this.modal3.info(template, {
            title: titleMap[type]
        });
    }

    public downloadXMLFile(creativeId: number): void {
        if (!this.creativeIdForLoadingXMLFile && this.offerId) {
            this.creativeIdForLoadingXMLFile = creativeId;
            this.offerProfileCreativesService
                .downloadXMLFile(this.offerId, creativeId)
                .pipe(take(1))
                .subscribe((response) => {
                    fileUtil.createFile(response);
                    this.creativeIdForLoadingXMLFile = null;
                    this.cdr.detectChanges();
                });
        }
    }
}
