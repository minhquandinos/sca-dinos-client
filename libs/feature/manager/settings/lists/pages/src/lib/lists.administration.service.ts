import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

import { ApiResponse } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';

import { BasicListsAdministrationInterface } from './lists.administration.interface';

@Injectable({ providedIn: 'root' })
export class ListsAdministrationService {
    private url = `${this.env.serverUrl}/platform`;

    constructor(private http: HttpClient, private env: EnvService) {}

    public indexTags(): Observable<BasicListsAdministrationInterface[]> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface[]>>(`${this.url}/administration/tags`)
            .pipe(pluck('info', 'tags'));
    }

    public getTag(id: number): Observable<BasicListsAdministrationInterface> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface>>(`${this.url}/administration/tags/${id}`)
            .pipe(pluck('info', 'tag'));
    }

    public createTag(post: BasicListsAdministrationInterface): Observable<BasicListsAdministrationInterface> {
        return this.http.post<BasicListsAdministrationInterface>(`${this.url}/administration/tags`, post);
    }

    public updateTag(id: number, post: BasicListsAdministrationInterface): Observable<BasicListsAdministrationInterface> {
        return this.http.put<BasicListsAdministrationInterface>(`${this.url}/administration/tags/${id}`, post);
    }

    public deleteTag(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/administration/tags/${id}`);
    }

    public indexTrafficTypes(): Observable<BasicListsAdministrationInterface[]> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface[]>>(`${this.url}/administration/traffic-types`)
            .pipe(pluck('info', 'traffic-types'));
    }

    public getTrafficType(id: number): Observable<BasicListsAdministrationInterface> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface>>(`${this.url}/administration/traffic-types/${id}`)
            .pipe(pluck('info', 'traffic-type'));
    }

    public createTrafficType(post: BasicListsAdministrationInterface): Observable<BasicListsAdministrationInterface> {
        return this.http.post<BasicListsAdministrationInterface>(`${this.url}/administration/traffic-types`, post);
    }

    public updateTrafficType(id: number, post: BasicListsAdministrationInterface): Observable<BasicListsAdministrationInterface> {
        return this.http.put<BasicListsAdministrationInterface>(`${this.url}/administration/traffic-types/${id}`, post);
    }

    public deleteTrafficType(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/administration/traffic-types/${id}`);
    }

    // Messengers
    public indexMessengers(): Observable<BasicListsAdministrationInterface[]> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface[]>>(`${this.url}/administration/messengers`)
            .pipe(pluck('info', 'messengers'));
    }

    public getMessenger(id: number): Observable<BasicListsAdministrationInterface> {
        return this.http
            .get<ApiResponse<BasicListsAdministrationInterface>>(`${this.url}/administration/messengers/${id}`)
            .pipe(pluck('info', 'messenger'));
    }

    public updateMessenger(id: number, post: BasicListsAdministrationInterface): Observable<BasicListsAdministrationInterface> {
        // const activeMessengersIds = this.platformStoreService.activeMessengersIds.value;
        //
        // if (activeMessengersIds.includes(post.id) && post.status === PlatformListsStatusesEnum.Inactive) {
        //     const newIds: number[] = [...activeMessengersIds].filter((elemId) => elemId !== post.id);
        //     this.platformStoreService.activeMessengersIds.next(newIds);
        // } else if (!activeMessengersIds.includes(post.id) && post.status === PlatformListsStatusesEnum.Active) {
        //     const newIds: number[] = [...activeMessengersIds, +post.id];
        //     this.platformStoreService.activeMessengersIds.next(newIds);
        // }

        return this.http.put<BasicListsAdministrationInterface>(`${this.url}/administration/messengers/${id}`, post);
    }
}
