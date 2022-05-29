import { Pipe, PipeTransform } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { CreativeHtmlCodeConverter } from './classes/creative-html-code-converter';

@Pipe({
    name: 'creativeHtmlCodeConvert'
})
export class CreativeHtmlCodeConvertPipe implements PipeTransform {
    constructor(private readonly profileQuery: ProfileQuery, private readonly offerDetailQuery: OfferDetailQuery) {}

    transform(creative: ManagerOfferCreativeModel): string {
        const creativeHtmlCodeConverterClass = new CreativeHtmlCodeConverter(this.offerDetailQuery);
        return creativeHtmlCodeConverterClass.convert(creative);
    }
}
