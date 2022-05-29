import { Injectable } from '@angular/core';

import { BaseObjectModel, ValuesOf } from '@scaleo/core/data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Util } from '@scaleo/utils';

export type PathType =
    | 'users'
    | 'platform'
    | 'offers'
    | 'creatives'
    | 'pixels'
    | 'affiliates'
    | 'advertisers'
    | 'announcements'
    | 'empty'
    | 'payments-methods';

// TODO merge this service with libs/shared/pipes/src/lib/default-image/default-image.pipe.ts
@Injectable({
    providedIn: 'root'
})
export class PathFileService {
    constructor(private readonly platformSettingsQuery: PlatformSettingsQuery) {}

    countryIcon(country: string): string {
        return `./assets/icons/flags/${country}.svg`;
    }

    platformImage(image: string = null, type: PathType = 'users'): string {
        const platformSettings = this.platformSettingsQuery.settings;
        if (image) {
            const bucketUrl = platformSettings['bucket_url'];
            let bucketPathUsers = platformSettings['bucket_path_users'];

            switch (type) {
                case 'platform':
                    bucketPathUsers = platformSettings['bucket_path_platform'];
                    break;
                case 'offers':
                    bucketPathUsers = platformSettings['bucket_path_offers'];
                    break;
                case 'creatives':
                    bucketPathUsers = platformSettings['bucket_path_creatives'];
                    break;
                case 'pixels':
                    bucketPathUsers = platformSettings['bucket_path_pixels'];
                    break;
                case 'announcements':
                    bucketPathUsers = 'announcements/';
                    break;
                case 'empty':
                    bucketPathUsers = '';
                    break;
                case 'payments-methods':
                    bucketPathUsers = 'payments-methods/';
                    break;
                case 'users':
                default:
                    bucketPathUsers = platformSettings['bucket_path_users'];
                    break;
            }

            return `${bucketUrl}${bucketPathUsers}${image}`;
        }

        switch (type) {
            case 'affiliates':
                return './assets/img/affiliate_default.svg';
            case 'announcements':
                return './assets/img/announcement_default.svg';
            case 'offers':
            case 'payments-methods':
                return './assets/img/offer_default.svg';
            case 'advertisers':
                return './assets/img/advertiser_default.svg';
            default:
                return './assets/img/manager_default.svg';
        }
    }

    getLinkToFile(fileName: string, type: 'adjustments'): string {
        const platformSettings = this.platformSettingsQuery.settings;
        const bucketUrl = platformSettings['bucket_url'];
        let bucketPath: string;
        switch (type) {
            case 'adjustments':
                bucketPath = platformSettings['bucket_path_adjustments'];
                break;
            default:
                break;
        }
        return `${bucketUrl}${bucketPath}${fileName}`;
    }

    // Type extends Array<infer Item> ? Item : Type;
    // TODO fixed to return type with infer and remove function overloading
    appendPathToEntity<T extends BaseObjectModel | BaseObjectModel[]>(
        entity: T,
        imageKey: ValuesOf<T>,
        type: PathType
    ): T extends (infer R)[] ? R[] : T {
        // TODO fixed any
        const getImagePath = <U>(elem: any): U => {
            return Util.cloneObject<U>(elem, { [imageKey]: this.platformImage(elem?.[imageKey], type) });
        };

        if (Array.isArray(entity)) {
            // TODO fixed any
            return entity.filter((elem) => !!elem).map((elem) => getImagePath<T>(elem)) as any;
        }

        if (typeof entity === 'object') {
            return getImagePath(entity);
        }

        return undefined;
    }
}
