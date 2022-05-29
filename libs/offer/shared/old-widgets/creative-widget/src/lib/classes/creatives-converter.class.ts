import { AffiliateOfferCreativeModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { TrackingDomainsInterface } from '@scaleo/offer/common';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export class CreativesConverterClass {
    convertHTMLCode(
        creative: AffiliateOfferCreativeModel,
        idAff?: string,
        track?: TrackingDomainsInterface,
        defaultTrackingDomain?: string
    ): AffiliateOfferCreativeModel {
        const newCreative = Util.cloneDeep(creative);
        let trackingDomain = defaultTrackingDomain;
        if (track?.name) {
            trackingDomain = track.name;
        }
        const affId = idAff || '{affiliate_id}';
        const tracking = `${trackingDomain}/click?o=${newCreative.offer_id}&a=${affId}&creative_id=${newCreative.id}`;
        newCreative.tracking_url = tracking;
        const trackingForImressions = `${trackingDomain}/impression?creative_id=${creative.id}&affiliate_id=${affId}`;
        if (newCreative.type === OfferUrlsTypeIdEnum.Default) {
            // creative.html_code = `<a href="${tracking}" target=“_blank”><img src="${creative.image}" width="${creative.image_width}" height="${creative.image_height}" /></a>`;
            newCreative.html_code = `
                <a href="${tracking}" target=“_blank”>
                <img src="${trackingForImressions}" width="${newCreative.image_width}" height="${newCreative.image_height}" />
                </a>
            `;
        } else {
            newCreative.html_code = newCreative?.html_code?.replace(/{creative_id}/g, String(creative.id));
            newCreative.html_code = newCreative?.html_code?.replace(/{tracking_url}/g, tracking);
            newCreative.html_code = newCreative?.html_code?.replace(/{offer_id}/g, String(creative.offer_id));
            newCreative.html_code = newCreative?.html_code?.replace(/{affiliate_id}/g, affId);
            if (newCreative.count_impressions) {
                const indexHaveHTML = creative.html_code.indexOf('</body>');
                const htmlImpress = `<img src="${trackingForImressions}" width="0" height="0" />`;
                if (indexHaveHTML > 0) {
                    newCreative.html_code = `${
                        newCreative.html_code.substring(0, indexHaveHTML) + htmlImpress
                    }\n${newCreative.html_code.substring(indexHaveHTML, newCreative.html_code.length)}`;
                } else {
                    newCreative.html_code = `${newCreative.html_code}\n${htmlImpress}`;
                }
            }
        }

        return newCreative;
    }
}
