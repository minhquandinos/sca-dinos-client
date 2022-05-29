import { HttpParams } from '@angular/common/http';

import { GetFilterInterface, Post2FiltersInterface } from './filters2/filter2.interface';

// TODO refactor
/*
 * @deprecated Please use other Methods
 * */
export class QueryHelper {
    static readonly regexpForId = '^#\\d+$';

    // eslint-disable-next-line
    public static filtersHttpParams(filters: GetFilterInterface): HttpParams {
        // TODO refactor thi methods
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let Params = new HttpParams();
        if (filters) {
            Params = !filters.page ? Params : Params.append('page', String(filters.page));
            Params = !filters.perPage ? Params : Params.append('perPage', String(filters.perPage));
            Params = !filters.sortField ? Params : Params.append('sortField', filters.sortField);
            Params = !filters.sortDirection ? Params : Params.append('sortDirection', filters.sortDirection);
            Params = !filters.search ? Params : Params.append('search', QueryHelper.checkIdExact(filters));
            Params = QueryHelper.setExact(Params, filters);
            Params = !filters.type ? Params : Params.append('type', filters.type);
            Params = !filters.onlyMine ? Params : Params.append('onlyMine', filters.onlyMine);
            Params = !filters.status ? Params : Params.append('status', filters.status);
            Params = !filters.role ? Params : Params.append('role', filters.role);
            Params = !filters.lang ? Params : Params.append('lang', filters.lang);
            Params = !filters.countries ? Params : Params.append('countries', QueryHelper.convertArrayToString(filters.countries));
            Params = !filters.tags ? Params : Params.append('tags', QueryHelper.convertArrayToString(filters.tags));
            Params = !filters.managers ? Params : Params.append('managers', QueryHelper.convertArrayToString(filters.managers));
            Params = !filters.goals_types ? Params : Params.append('goalsTypes', QueryHelper.convertArrayToString(filters.goals_types));
            Params = !filters.advertisers ? Params : Params.append('advertisers', QueryHelper.convertArrayToString(filters.advertisers));
            Params = !filters.affiliates ? Params : Params.append('affiliates', QueryHelper.convertArrayToString(filters.affiliates));
            Params = !filters.columns ? Params : Params.append('columns', filters.columns);
            Params = !filters.rangeFrom ? Params : Params.append('rangeFrom', filters.rangeFrom);
            Params = !filters.rangeTo ? Params : Params.append('rangeTo', filters.rangeTo);
            Params = !filters.onlyNew ? Params : Params.append('onlyNew', filters.onlyNew);
            Params = !filters.onlyFeatured ? Params : Params.append('onlyFeatured', filters.onlyFeatured);
            Params = !filters.level ? Params : Params.append('level', filters.level);
            Params = !filters.goalsTypes ? Params : Params.append('goalsTypes', QueryHelper.convertArrayToString(filters.goalsTypes));
            Params = !filters.format ? Params : Params.append('format', filters.format);
            Params = !filters.affiliate ? Params : Params.append('affiliate', filters.affiliate);
            Params = !filters.offer ? Params : Params.append('offer', filters.offer);
            Params = !filters.offers ? Params : Params.append('offers', QueryHelper.convertArrayToString(filters.offers));
            Params = !filters.advertiser ? Params : Params.append('advertiser', filters.advertiser);
            Params = !filters.preset ? Params : Params.append('preset', filters.preset);
            Params = !filters.currency ? Params : Params.append('currency', filters.currency);
            Params = !filters.category_id ? Params : Params.append('category_id', filters.category_id.toString());
            Params = !filters.onMyOffers ? Params : Params.append('onMyOffers', filters.onMyOffers);
            Params = !filters.active_managers ? Params : Params.append('active_managers', filters.active_managers.toString());
            Params = !filters.fieldsType ? Params : Params.append('fieldsType', filters.fieldsType);
            Params = !filters.visible_type ? Params : Params.append('visible_type', QueryHelper.convertArrayToString(filters.visible_type));
            Params = !filters.except ? Params : Params.append('except', filters.except.toString());
            Params = !filters.campaigns ? Params : Params.append('campaigns', QueryHelper.convertArrayToString(filters.campaigns));
            Params = !filters?.exclude_role ? Params : Params.append('exclude_role', filters?.exclude_role.toString().toLowerCase());
            Params = !filters.affiliate_ids ? Params : Params.append('affiliate_ids', filters.affiliate_ids);
            Params = !filters.invoice_frequency
                ? Params
                : Params.append('invoice_frequency', QueryHelper.convertArrayToString(filters.invoice_frequency));
            Params = !filters.payment_terms
                ? Params
                : Params.append('payment_terms', QueryHelper.convertArrayToString(filters.payment_terms));
            Params = !filters.payment_methods
                ? Params
                : Params.append('payment_methods', QueryHelper.convertArrayToString(filters.payment_methods));
            Params = !filters.payments_methods
                ? Params
                : Params.append('payments_methods', QueryHelper.convertArrayToString(filters.payments_methods));
            Params = !filters.currencies ? Params : Params.append('currencies', QueryHelper.convertArrayToString(filters.currencies));
        }

        return Params;
    }

    static filtersBodyParams(filters: Post2FiltersInterface): Post2FiltersInterface {
        const payload = JSON.parse(JSON.stringify(filters));
        if (payload && Object.keys(payload).length > 0) {
            const payloadFilters = payload;
            Object.keys(payloadFilters).forEach((key) => {
                if (!!payloadFilters[key] || payloadFilters[key] === 0) {
                    if (payloadFilters[key] instanceof Array) {
                        payloadFilters[key] = QueryHelper.convertArrayToString(payloadFilters[key]);
                        if (payloadFilters[key].length === 0) {
                            delete payloadFilters[key];
                            // payloadFilters[key] = '';
                        }
                    } else if (payloadFilters[key] instanceof Object) {
                        const objArr = payloadFilters[key];
                        if (!!objArr && Object.keys(objArr).length > 0) {
                            Object.keys(payloadFilters[key]).forEach((key2) => {
                                if (Array.isArray(objArr[key2])) {
                                    objArr[key2] = QueryHelper.convertArrayToString(objArr[key2]);
                                }
                                if (objArr[key2].length === 0) {
                                    delete payloadFilters[key][key2];
                                    // payloadFilters[key][key2] = '';
                                }
                            });
                        } else {
                            delete payloadFilters[key];
                            // payloadFilters[key] = '';
                        }
                    }
                } else {
                    delete payloadFilters[key];
                    // payloadFilters[key] = '';
                }
            });
            return payloadFilters;
        }
        return null;
    }

    private static convertArrayToString(value: unknown | unknown[]): string {
        if (Array.isArray(value)) {
            return value.length > 0 ? value.map((el) => el.id).join(',') : '';
        }

        if (typeof value === 'string') {
            return value;
        }

        return null;
    }

    static setExact(params: HttpParams, filters: GetFilterInterface): HttpParams {
        if (filters.exact) {
            params = params.append('exact', filters.exact);
        } else if (filters?.search && String(filters.search).match(QueryHelper.regexpForId)) {
            params = params.append('exact', 'id');
        }

        return params;
    }

    static checkIdExact(filters: GetFilterInterface): string {
        if (!filters.exact && filters?.search && String(filters.search).match(QueryHelper.regexpForId)) {
            return filters.search.replace('#', '');
        }
        return filters.search;
    }
}
