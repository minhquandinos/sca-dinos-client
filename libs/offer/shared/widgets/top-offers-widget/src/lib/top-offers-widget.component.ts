import { Component, Input } from '@angular/core';
import { map, Observable, share } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DETAIL_WIDGET_WRAPPER_TOKEN, DetailWidgetWrapperInterface } from '@scaleo/shared/widgets/detail-widget-wrapper';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

import { TopOffersWidgetService } from './top-offers-widget.service';

@Component({
    selector: 'scaleo-top-offers-widget',
    template: `
        <ui-simple-table
            tableStyle="clear"
            [headers]="columns"
            [items]="items$ | async"
            [notFound]="notFound$ | async"
            [isLoad]="isLoad"
            skeletonRowCount="3"
            skeletonColCount="4"
            colHeight="70px"
        >
            <ng-template uiSimpleTableColTpl="info" let-item="valueRow">
                <a [routerLink]="'/offers/' + (item.offer | pregMatch: 'number') | navigateRoot" class="name-title">
                    <span class="text-pre-wrap">{{ item.offer | format: 'idName' }}</span>
                </a>
            </ng-template>
            <ng-template uiSimpleTableColTpl="info" let-clicks>
                {{ clicks | format: 'number' }}
            </ng-template>
            <ng-template uiSimpleTableColTpl="cv_total" let-cv_total>
                {{ cv_total | format: 'number' }}
            </ng-template>
            <ng-template uiSimpleTableColTpl="total_revenue" let-total_revenue>
                {{ total_revenue | format: 'money' }}
            </ng-template>
        </ui-simple-table>
    `,
    providers: [
        TopOffersWidgetService,
        {
            provide: DETAIL_WIDGET_WRAPPER_TOKEN,
            useExisting: TopOffersWidgetComponent
        }
    ]
})
export class TopOffersWidgetComponent implements DetailWidgetWrapperInterface {
    @Input() set id(id: number) {
        if (id) {
            this.service.setAdvertiserId(id);
        }
    }

    items$: Observable<any> = this.service.index().pipe(
        tap(() => {
            if (!this.isLoad) {
                this.isLoad = true;
            }
        }),
        share()
    );

    readonly counts$: Observable<number> = this.items$.pipe(map((items) => items?.length || 0));

    notFound$ = this.items$.pipe(map((items) => !items?.length));

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'offer',
            translateSchema: 'table.column.offer'
        },
        {
            value: 'clicks',
            translateSchema: 'table.column.clicks'
        },
        {
            value: 'conversions',
            translateSchema: 'table.column.conversions'
        },
        {
            value: 'total_revenue',
            translateSchema: 'table.column.total_revenue'
        }
    ];

    isLoad: boolean;

    constructor(private readonly service: TopOffersWidgetService) {}

    navigateRout(): void {
        console.log('to link');
    }

    updateDate(rangeFrom: string, rangeTo: string): void {
        this.service.setDateRange({ rangeFrom, rangeTo });
    }
}
