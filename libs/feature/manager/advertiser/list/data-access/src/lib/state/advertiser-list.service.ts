import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, startWith } from 'rxjs';
import { delay, map, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import {
    AdvertiserListModel,
    AdvertiserListQueryParamsDto,
    AdvertiserListQueryParamsModel,
    AdvertisersExportQueryParamsDto
} from '../advertiser-list.model';
import { AdvertisersService } from '../advertisers.service';
import { AdvertiserListApi } from '../api/advertiser-list.api';
import { allAdvertisersColumnsForExport } from '../configs/advertisers-export.config';
import { AdvertiserListQuery } from './advertiser-list.query';
import { AdvertiserListState, AdvertiserListStore } from './advertiser-list.store';

@Injectable()
export class AdvertiserListService extends BaseEntityService<AdvertiserListState> {
    constructor(
        protected readonly store: AdvertiserListStore,
        protected readonly query: AdvertiserListQuery,
        private advertisersService: AdvertisersService,
        private readonly api: AdvertiserListApi,
        private readonly pathFile: PathFileService,
        private readonly platformList: PlatformListsService
    ) {
        super(store, query);
    }

    public index(): Observable<AdvertiserListModel[]> {
        return combineLatest([
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1),
            this.query.reloading$.pipe(startWith(''))
        ]).pipe(
            delay(200),
            tap(() => {
                this.store.setLoading(true);
            }),
            switchMap(([queryParams]) => this.api.index(this.transformQueryParamsModelToDto(queryParams))),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            switchMap((results) => {
                return this.platformList.platformListsNew('messengers').pipe(
                    pluck('messengers'),
                    map((messengers) => {
                        const data = results.map((obj: AdvertiserListModel) => {
                            const contacts = new ContactAdapter(obj?.contacts, messengers);
                            return {
                                ...obj,
                                image: this.pathFile.platformImage(obj.image, 'advertisers'),
                                contacts: contacts.transform(),
                                managers_assigned: this.pathFile.appendPathToEntity(obj?.managers_assigned, 'image', 'users')
                            };
                        });

                        return data;
                    })
                );
            }),
            tap((advertisers: AdvertiserListModel[]) => {
                this.store.set(advertisers);
                this.store.setLoading(false);
            })
        );
    }

    export(format: SheetExtensionType): Observable<HttpResponse<ArrayBuffer>> {
        const filters = this.transformExportQueryParamsModelToDto(format);
        return this.api.export(filters);
    }

    private transformExportQueryParamsModelToDto(format: SheetExtensionType): AdvertisersExportQueryParamsDto {
        return {
            ...this.transformQueryParamsModelToDto(this.query.getParams()),
            format,
            columns: allAdvertisersColumnsForExport
        } as AdvertisersExportQueryParamsDto;
    }

    private transformQueryParamsModelToDto(queryParams: AdvertiserListQueryParamsModel): AdvertiserListQueryParamsDto {
        const { tags, countries, managers, ...params } = queryParams;
        return {
            ...params,
            tags: ArrayUtil.join(tags),
            countries: ArrayUtil.join(countries),
            managers: ArrayUtil.join(managers)
        };
    }
}
