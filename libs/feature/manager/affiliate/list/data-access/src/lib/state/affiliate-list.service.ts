import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import {
    AffiliateListExportQueryParamsDto,
    AffiliateListModel,
    AffiliateListQueryParamsDto,
    AffiliateListQueryParamsModel
} from '../affiliate-list.model';
import { allAffiliatesColumnsForExport } from '../affiliates-export.config';
import { AffiliateListApi } from '../api/affiliate-list.api';
import { AffiliateListQuery } from './affiliate-list.query';
import { AffiliateListState, AffiliateListStore } from './affiliate-list.store';

@Injectable()
export class AffiliateListService extends BaseEntityService<AffiliateListState> {
    constructor(
        protected store: AffiliateListStore,
        protected query: AffiliateListQuery,
        private readonly api: AffiliateListApi,
        private readonly platformList: PlatformListsService,
        private readonly pathFile: PathFileService
    ) {
        super(store, query);
    }

    public index(): Observable<AffiliateListModel[]> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            delay(200),
            tap(() => {
                this.store.setLoading(true);
            }),
            switchMap((queryParams) => this.api.index(this.transformQueryParamsModelToDto(queryParams))),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            switchMap((results) => {
                return this.platformList.platformListsNew('messengers').pipe(
                    pluck('messengers'),
                    map((messengers) => {
                        return results.map((obj: AffiliateListModel) => {
                            const contacts = new ContactAdapter(obj?.contacts, messengers);
                            return {
                                ...obj,
                                image: this.pathFile.platformImage(obj.image, 'advertisers'),
                                contacts: contacts.transform(),
                                managers_assigned: this.pathFile.appendPathToEntity(obj?.managers_assigned, 'image', 'users')
                            };
                        });
                    })
                );
            }),
            tap((results: AffiliateListModel[]) => {
                this.store.set(results);
                this.store.setLoading(false);
            })
        );

        return this.observable(observable);
    }

    export(format: SheetExtensionType): Observable<HttpResponse<ArrayBuffer>> {
        const params = this.transformExportQueryParamsModelToDto(format);
        return this.api.export(params);
    }

    private transformQueryParamsModelToDto(queryParams: AffiliateListQueryParamsModel): AffiliateListQueryParamsDto {
        const { tags, countries, managers, ...params } = queryParams;
        return {
            ...params,
            tags: ArrayUtil.join(tags),
            countries: ArrayUtil.join(countries),
            managers: ArrayUtil.join(managers)
        };
    }

    private transformExportQueryParamsModelToDto(format: SheetExtensionType): AffiliateListExportQueryParamsDto {
        return {
            ...this.transformQueryParamsModelToDto(this.query.getParams()),
            format,
            columns: allAffiliatesColumnsForExport
        } as AffiliateListExportQueryParamsDto;
    }
}
