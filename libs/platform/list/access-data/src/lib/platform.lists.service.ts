import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, take } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { PlatformListsFormatInterface } from './models/platform.lists.interface';
import { PlatformListModel, PlatformListStatusModel } from './models/platform-list.model';
import { PlatformListQuery } from './platform-list.query';
import { PlatformListStore } from './platform-list.store';

@Injectable({ providedIn: 'root' })
export class PlatformListsService {
    constructor(
        private rest: RestApiService,
        private query: PlatformListQuery,
        private store: PlatformListStore,
        private profile: ProfileQuery,
        private jsonConvertService: JsonConvertService
    ) {
        this.init();
    }

    private init(): void {
        // TODO add keys which need clear when change profile
        this.profile.profile$
            .pipe(
                tap(() => {
                    this.store.reset();
                })
            )
            .subscribe();
    }

    platformListsNew(params: string): Observable<PlatformListModel | any> {
        const paramsArr = params?.split(',');
        if (!paramsArr) {
            return EMPTY;
        }
        return this.query.list$(paramsArr).pipe(
            distinctUntilChanged(),
            debounceTime(300),
            switchMap((storeList) => {
                const emptyList = this.emptyList(storeList);
                if (emptyList.length > 0) {
                    return this.getList(emptyList, storeList);
                }

                return of({ ...storeList });
            }),
            take(1)
        );
    }

    private sortStatuses(statuses: PlatformListStatusModel[]): PlatformListStatusModel[] {
        const sortStatuses: any[] = [];
        statuses.forEach((obj) => {
            switch (obj.title.toLowerCase()) {
                case 'active':
                    sortStatuses.splice(0, 0, obj);
                    break;
                case 'pending':
                    sortStatuses.splice(1, 0, obj);
                    break;
                case 'testing':
                    sortStatuses.splice(2, 0, obj);
                    break;
                case 'inactive':
                    sortStatuses.splice(3, 0, obj);
                    break;
                default:
                    break;
            }
        });

        return sortStatuses;
    }

    private getList(lists: string[], storeList: PlatformListModel): Observable<PlatformListModel> {
        return this.rest.post<ApiResponse<PlatformListModel>>('platform-list', { lists: lists.join(',') }).pipe(
            debounceTime(300),
            pluck('info', 'lists'),
            map((result: PlatformListModel) => {
                let newResult: PlatformListModel = result;
                if (Array.isArray(result) && !(result as any[]).length) {
                    newResult = {
                        [lists[0]]: []
                    };
                }
                return this.jsonConvertService.mapper(
                    PlatformListModel,
                    newResult,
                    {
                        excludeExtraneousValues: true,
                        groups: [this.profile.role]
                    },
                    {
                        excludePrefixes: ['_'],
                        groups: [this.profile.role]
                    }
                );
            }),
            map((result) => {
                const newResult = { ...result };
                if (newResult?.statuses) {
                    newResult.statuses = this.sortStatuses(newResult.statuses);
                }

                if (newResult?.device_types) {
                    newResult.device_types = this.formatDeviceTypes(newResult.device_types);
                }

                if (newResult?.offers_statuses) {
                    newResult.offers_statuses = this.sortStatuses(newResult.offers_statuses);
                }

                return newResult;
            }),
            tap((result) => {
                Object.keys(result).forEach((key) => {
                    if (result[key] !== undefined) {
                        this.store.update((state) => ({
                            ...state,
                            [key]: result[key]
                        }));
                    }
                });
            }),
            switchMap(() => this.query.list$(lists)),
            map((result) => ({ ...storeList, ...result }))
        );
    }

    private emptyList(storeList: any): string[] {
        const empty: any[] = [];
        Object.keys(storeList).forEach((key) => {
            if (storeList[key]?.length === 0 || !storeList[key]) {
                empty.push(key);
            }
        });

        return empty;
    }

    private formatDeviceTypes(deviceTypes: PlatformListsFormatInterface[]): PlatformListsFormatInterface[] {
        return deviceTypes.map((type) => ({
            ...type,
            title: type.title === 'Smartphone' ? 'Phone' : type.title
        }));
    }

    // TODO quick fix, need refactor this method, and maybe all service
    updateMessenger(messenger: PlatformListsFormatInterface): void {
        const { messengers } = this.query.getValue();

        if (messengers?.length > 0) {
            let newMessengers: PlatformListsFormatInterface[] = [];

            if ((messenger as any)?.['status'] === 1) {
                newMessengers = [...messengers, { id: messenger.id, title: messenger.title }];
            }

            if ((messenger as any)?.['status'] === 3) {
                newMessengers = messengers?.filter((elem) => elem.id !== messenger.id);
            }

            this.store.update((state) => ({
                ...state,
                messengers: newMessengers
            }));
        }
    }
}
