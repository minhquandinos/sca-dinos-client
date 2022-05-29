import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { ProfileModel, ProfileRequestModel } from './profile.model';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class NewProfileService {
    constructor(
        private readonly profileStore: ProfileStore,
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly pathFileService: PathFileService
    ) {}

    get isStored(): boolean {
        return !!this.profileStore.getValue().id;
    }

    get(): Observable<ProfileModel> {
        return this.rest.get<ApiResponse<ProfileModel>>('user-profile').pipe(
            pluck('info', 'profile'),
            tap((profile) => {
                (window as any)['__persist_role'] = profile;
            }),
            map((profile) => ({
                ...profile,
                // image: this.path.platformImage(profile.image, 'users'),
                custom_fields: Util.jsonParse(profile.custom_fields, []),
                contacts: Util.jsonParse(profile.contacts, []),
                country: profile.country || null,
                image: this.pathFileService.platformImage(profile.image, 'users')
            })),
            tap((profile) => {
                this.setStore(profile);
            })
        );
    }

    updateStoreKey<K extends keyof ProfileModel>(key: K, value: ProfileModel[K]): void {
        this.profileStore.update({
            [key]: value
        });
    }

    update(post: ProfileRequestModel): Observable<ProfileRequestModel> {
        return this.rest.put<any>(`user-profile-update`, post);
    }

    updateApiKey(user_id: number, role: DefaultRoleEnum | string): Observable<string> {
        const post = {
            user_id: String(user_id),
            role: role.toLowerCase()
        };
        return this.rest.post<string>(`change-api-key`, post).pipe(
            pluck('info', 'api-key'),
            tap((api_key: string) => {
                this.profileStore.update({ api_key });
            })
        );
    }

    deleteImage(): Observable<any> {
        return this.rest.delete<any>('user-profile-delete-image');
    }

    public reset(): void {
        this.profileStore.reset();
    }

    private setStore(profile: ProfileModel): void {
        this.profileStore.update(this.jsonConvertService.mapper(ProfileModel, profile));
    }
}
