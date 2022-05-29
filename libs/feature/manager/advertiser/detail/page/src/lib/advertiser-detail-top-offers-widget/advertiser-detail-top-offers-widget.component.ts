import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TopOfferListComponent } from '@scaleo/dashboard/shared/widgets/top/components/offer/list';
import { TopOffersService } from '@scaleo/data-access/top/offers';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { DayPresetsType } from '@scaleo/shared/components';
import { DETAIL_WIDGET_WRAPPER_TOKEN, DetailWidgetWrapperInterface } from '@scaleo/shared/widgets/detail-widget-wrapper';

@Component({
    selector: 'scaleo-advertiser-detail-top-offers-widget',
    template: `
        <scaleo-top-offer-list
            [filters]="{ advertisers: id.toString() }"
            [date$]="dateRange$"
            (initFooterEvent)="initFooter($event)"
        ></scaleo-top-offer-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TopOffersService,
        {
            provide: DETAIL_WIDGET_WRAPPER_TOKEN,
            useExisting: AdvertiserDetailTopOffersWidgetComponent
        }
    ]
})
export class AdvertiserDetailTopOffersWidgetComponent implements DetailWidgetWrapperInterface {
    @Input()
    id: number;

    @ViewChild(TopOfferListComponent)
    private _topOfferListRef: TopOfferListComponent;

    private _dateRange$: BehaviorSubject<CustomDateRangeModel> = new BehaviorSubject<CustomDateRangeModel>({
        rangeTo: this.customDateRangeService.rangeTo,
        rangeFrom: this.customDateRangeService.rangeFrom,
        selectedRange: CustomDateRangeTitleEnum.Last14Days
    });

    private _footerTemplate$: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(undefined);

    footerTemplate$: Observable<TemplateRef<any>> = this._footerTemplate$.asObservable();

    readonly dateRange$ = this._dateRange$.asObservable();

    constructor(private readonly customDateRangeService: CustomDateRangeService) {}

    updateDate(rangeFrom: string, rangeTo: string, selectedRange: DayPresetsType): void {
        this._dateRange$.next({ rangeFrom, rangeTo, selectedRange });
    }

    initFooter(template: TemplateRef<any>): void {
        this._footerTemplate$.next(template);
    }
}
