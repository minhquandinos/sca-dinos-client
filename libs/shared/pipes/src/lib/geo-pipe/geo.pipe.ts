import { Pipe, PipeTransform } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

// import { ShortGeoNameModel } from '../../../../../../apps/scaleo/src/app/core/services/short-entity-list/models';
// import { OfferTargetingGeoModel } from '../../../../../../apps/scaleo/src/app/oldest/models/offer';

// type GeoType = ShortGeoNameModel | OfferTargetingGeoModel;
// TODO NX add correct path to ShortGeoNameModel | OfferTargetingGeoModel
type GeoType = BaseObjectModel | any;

@Pipe({
    name: 'geo'
})
export class GeoPipe implements PipeTransform {
    private static region(item: GeoType): string {
        if (item.title === item.region_title) {
            const region = item.region_title.split(' ').length === 1 ? `${item.region_title}, ` : '';
            return `(${region}${item.country_title})`;
        }
        return `(${item.region_title}, ${item.country_title})`;
    }

    transform(item: GeoType): string {
        const { title, region_title } = item;
        if (region_title) {
            return `${title} ${GeoPipe.region(item)}`;
        }
        return title;
    }
}
