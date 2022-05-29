import { Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';
import { combineLatest, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { PathFileService } from '@scaleo/shared/services/path-file';

import { WidgetServiceInterface } from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { OfferPromoteWidgetApi } from '../api/offer-promote-widget.api';
import { OfferPromoteWidgetItemsModel, OfferPromoteWidgetResponseModel } from '../models/offer-promote-widget.model';
import { OfferPromoteWidgetQuery } from './offer-promote-widget.query';
import { OfferPromoteWidgetStore } from './offer-promote-widget.store';
import { OfferPromoteWidgetCategoriesQuery } from './offer-promote-widget-categories.query';
import { OfferPromoteWidgetCategoriesStore } from './offer-promote-widget-categories.store';

@Injectable()
export class OfferPromoteWidgetService implements WidgetServiceInterface<OfferPromoteWidgetResponseModel> {
    get widgetData$(): Observable<OfferPromoteWidgetResponseModel> {
        return this.get();
    }

    widgetSubject$: Subject<any> = new Subject<any>();

    constructor(
        private api: OfferPromoteWidgetApi,
        private storeItems: OfferPromoteWidgetStore,
        private queryItems: OfferPromoteWidgetQuery,
        private storeCategories: OfferPromoteWidgetCategoriesStore,
        private queryCategories: OfferPromoteWidgetCategoriesQuery,
        private readonly pathFileService: PathFileService,
        private dashboardToolbarService: DashboardToolbarService
    ) {}

    get(): Observable<OfferPromoteWidgetResponseModel> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => combineLatest([this.queryItems.select('ui'), this.dashboardToolbarService.dateRange$])),
            switchMap(([storeFilters]) => this.api.get(storeFilters.filters)),
            tap(({ offers, counts }) => {
                const newOffers = this.mapper(offers);
                this.storeItems.set(newOffers);
                this.storeCategories.set(counts);
            })
        );
    }

    updateFilter(categoryId: number): void {
        this.storeItems.update((state) => {
            return {
                ui: {
                    ...state.ui,
                    filters: {
                        ...state.ui.filters,
                        params: {
                            ...state.ui.filters.params,
                            category_id: categoryId
                        }
                    }
                }
            };
        });
    }

    setLoading(loading: boolean): void {
        this.storeItems.setLoading(loading);
    }

    private mapper(offers: OfferPromoteWidgetItemsModel[]): OfferPromoteWidgetItemsModel[] {
        const jsonConvert: JsonConvert = new JsonConvert();
        let newOffers: OfferPromoteWidgetItemsModel[];
        try {
            const transformOffer = offers.map((offer) => ({
                ...offer,
                image: this.pathFileService.platformImage(offer.image, 'offers')
            }));
            newOffers = jsonConvert.deserializeArray(transformOffer, OfferPromoteWidgetItemsModel);

            return newOffers;
        } catch (e) {
            console.log(<Error>e);
        }

        return [];
    }
}
