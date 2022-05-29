import { TranslateService } from '@ngx-translate/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { InvoiceStatusNameEnum, InvoiceStatusTranslateEnum, PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { OutputSelectedFiltersModel } from '@scaleo/shared/components';
import { ShortAdvertiserModel, ShortAffiliateModel, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';

import {
    ExtendedAffiliateSourceInterface,
    ExtendedOffersItemInterface
} from '../components/report-filters-selected/report-filters-selected-composite-filter/models/report-filters-selected-composite-filter.model';

export class ReportOutputDataFilterTransform {
    constructor(
        private key: ReportFilterFilterEnum,
        private value: any,
        private formatPipe: FormatPipe,
        private translateService: TranslateService
    ) {}

    private static textarea(value: string): OutputSelectedFiltersModel[] {
        return value.split('\n').map((filter) => ({
            id: filter,
            title: filter
        }));
    }

    private static managers(values: ShortManagerModel[]): OutputSelectedFiltersModel[] {
        return values.map((value) => ({
            id: value.id,
            title: value.title,
            image: value.image
        }));
    }

    public transform(): OutputSelectedFiltersModel[] {
        return this.transformFactory;
    }

    private get transformFactory(): any {
        if (!this.value) {
            return undefined;
        }
        if (!Array.isArray(this.value) && typeof this.value === 'string') {
            return ReportOutputDataFilterTransform.textarea(this.value);
        }

        switch (this.key) {
            case ReportFilterFilterEnum.Advertiser:
                return this.advertiser(this.value);

            case ReportFilterFilterEnum.Offer:
                return this.offer(this.value);

            case ReportFilterFilterEnum.Affiliate:
                return this.affiliate(this.value);

            case ReportFilterFilterEnum.AdvertiserMananger:
            case ReportFilterFilterEnum.AffiliateManager:
                return ReportOutputDataFilterTransform.managers(this.value);
            case ReportFilterFilterEnum.LandingPage:
            case ReportFilterFilterEnum.Goal:
            case ReportFilterFilterEnum.Creative:
                return this.extendedOffers(this.value);
            case ReportFilterFilterEnum.AffiliateSource:
                return this.extendedAffiliates(this.value);
            case ReportFilterFilterEnum.Reason:
            case ReportFilterFilterEnum.Redirection:
                return this.setReasonAndRedirectionValues(this.value);
            case ReportFilterFilterEnum.SmartLinks:
                return this.smartLink(this.value);
            case ReportFilterFilterEnum.PaidToAffiliate:
                return this.paidToAffiliate(this.value);
            default:
                break;
        }

        return this.value;
    }

    private affiliate(values: ShortAffiliateModel[]): OutputSelectedFiltersModel[] {
        return values.map((value) => ({
            id: value.id,
            title: this.transformIdName(value.id, value.title)
        }));
    }

    private smartLink(values: ShortResponseInterface[]): OutputSelectedFiltersModel[] {
        return values.map((value) => ({
            id: value.id,
            title: this.transformIdName(value.id, value.title)
        }));
    }

    private advertiser(values: ShortAdvertiserModel[]): OutputSelectedFiltersModel[] {
        return values.map((value) => ({
            id: value.id,
            title: this.transformIdName(value.id, value.title)
        }));
    }

    private offer(values: ShortResponseInterface[]): OutputSelectedFiltersModel[] {
        return values.map((value) => ({
            id: value.id,
            title: this.formatPipe.transform(`${value.id} ${value.title}`, 'idName')
        }));
    }

    private setReasonAndRedirectionValues(values: PlatformListsFormatInterface[]): OutputSelectedFiltersModel[] {
        const titleKey = `title_${this.translateService.currentLang}`;
        return values.map((value: PlatformListsFormatInterface) => ({
            id: value.id,
            title: (value as any)?.[titleKey] as string
        }));
    }

    private paidToAffiliate(values: ShortResponseInterface[]): any {
        const schema = {
            [InvoiceStatusNameEnum.Paid]: InvoiceStatusTranslateEnum.Paid,
            [InvoiceStatusNameEnum.Unpaid]: InvoiceStatusTranslateEnum.Unpaid
        };

        return values.map((value) => {
            const { id, title, status } = value;
            const titleSchema = (schema as any)?.[status as InvoiceStatusNameEnum];
            return {
                id,
                title: titleSchema ? this.translateService.instant(titleSchema) : title
            };
        });
    }

    private extendedOffers(values: ExtendedOffersItemInterface[]): OutputSelectedFiltersModel[] {
        return values.map((value: ExtendedOffersItemInterface) => {
            const parentName = this.transformIdName(value.offer_id, value.offer_name);
            return this.extendedShared(value, parentName);
        });
    }

    private extendedAffiliates(values: ExtendedAffiliateSourceInterface[]): OutputSelectedFiltersModel[] {
        return values.map((value: ExtendedAffiliateSourceInterface) => {
            const parentName = this.transformIdName(value.affiliate_id, value.affiliate_name);
            return this.extendedShared(value, parentName);
        });
    }

    private extendedShared(
        value: ExtendedAffiliateSourceInterface | ExtendedOffersItemInterface,
        parentName: string
    ): OutputSelectedFiltersModel {
        const itemName = this.transformIdName(value.id, value.title);
        return {
            id: value.id,
            title: `${itemName} (${parentName})`
        };
    }

    private transformIdName(id: string | number, name: string): string {
        return this.formatPipe.transform(`${id} ${name}`, 'idName');
    }
}
