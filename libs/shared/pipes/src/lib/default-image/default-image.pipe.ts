import { Pipe, PipeTransform } from '@angular/core';

import { DEFAULT_IMAGE, DefaultImageType } from './default-image.model';

// TODO merge this pipe with libs/shared/services/path-file/src/lib/path-file.service.ts
@Pipe({
    name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {
    readonly defaultImages = {
        [DEFAULT_IMAGE.payment]: './assets/img/offer_default.svg',
        [DEFAULT_IMAGE.manager]: './assets/img/manager_default.svg',
        [DEFAULT_IMAGE.offer]: './assets/img/offer_default.svg',
        [DEFAULT_IMAGE.affiliate]: './assets/img/affiliate_default.svg',
        [DEFAULT_IMAGE.advertiser]: './assets/img/advertiser_default.svg'
    };

    transform(logo: string, type: DefaultImageType): string {
        return logo || this.defaultImages[type];
    }
}
