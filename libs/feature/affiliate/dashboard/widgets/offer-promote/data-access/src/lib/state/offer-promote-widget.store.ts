import { Injectable } from '@angular/core';
import { EntityState, EntityStore, guid, StoreConfig } from '@datorama/akita';

import { Filter2Interface } from '@scaleo/shared/services/filters';

import { OfferPromoteWidgetItemsModel } from '../models/offer-promote-widget.model';

export interface OfferPromoteWidgetState extends EntityState<OfferPromoteWidgetItemsModel> {
    ui: {
        filters: Filter2Interface;
    };
}

const initialState: OfferPromoteWidgetState = {
    ui: {
        filters: {
            params: {
                page: 1,
                perPage: 20,
                sortField: 'id',
                sortDirection: 'asc'
            }
        }
    }
};

@Injectable()
export class OfferPromoteWidgetStore extends EntityStore<OfferPromoteWidgetState> {
    constructor() {
        super(initialState, { name: `dashboard-offer-promote-items-${guid()}` });
    }
}
