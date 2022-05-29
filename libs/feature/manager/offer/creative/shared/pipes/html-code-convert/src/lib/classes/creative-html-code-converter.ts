import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

export class CreativeHtmlCodeConverter {
    private readonly affiliateId = '{affiliate_id}';

    private readonly offerId: number;

    private trackingDomain: string;

    private trackingLink: string;

    private trackingLinkForImpression: string;

    constructor(private readonly offerDetailQuery: OfferDetailQuery) {
        this.offerId = this.offerDetailQuery.id;
    }

    convert(creative: ManagerOfferCreativeModel): string {
        const { id, type, tracking_domain } = creative;
        this.trackingDomain = tracking_domain;
        this.trackingLink = this.initTrackingLink(id);
        this.trackingLinkForImpression = this.initTrackingLinkForImpression(id);

        return type.id === CreativeTypesIdEnum.Banner ? this.initHtmlCodeForBanner(creative) : this.initDefaultHtmlCode(creative);
    }

    private initTrackingLink(creativeId: number): string {
        return `${this.trackingDomain}/click?o=${this.offerId}&a=${this.affiliateId}&creative_id=${creativeId}`;
    }

    private initTrackingLinkForImpression(creativeId: number): string {
        return `${this.trackingDomain}/impression?creative_id=${creativeId}&affiliate_id=${this.affiliateId}`;
    }

    private initHtmlCodeForBanner({ image_height, image_width }: ManagerOfferCreativeModel): string {
        return `<a href="${this.trackingLink}" target=“_blank”>
                    <img src="${this.trackingLinkForImpression}" width="${image_width}" height="${image_height}" />
                </a>`;
    }

    private initDefaultHtmlCode({ id, html_code, count_impressions }: ManagerOfferCreativeModel): string {
        let htmlCode = this.replaceMacrosToValue(id, html_code);

        if (count_impressions) {
            const bodyTagIndex = html_code.indexOf('</body>');
            const htmlImpress = `<img src="${this.trackingLinkForImpression}" width="0" height="0" />`;
            if (bodyTagIndex > 0) {
                htmlCode = `${htmlCode.substring(0, bodyTagIndex) + htmlImpress}\n${htmlCode.substring(bodyTagIndex, htmlCode.length)}`;
            } else {
                htmlCode = `${htmlCode}\n${htmlImpress}`;
            }
        }
        return htmlCode;
    }

    private replaceMacrosToValue(id: number, htmlCode: string): string {
        const macrosMap: { [macros: string]: string } = {
            creative_id: id.toString(),
            tracking_url: this.trackingLink,
            offer_id: this.offerId.toString(),
            affiliate_id: this.affiliateId
        };
        Object.keys(macrosMap).forEach((macros) => {
            const regExp = new RegExp(`{${macros}}`, 'g');
            htmlCode = htmlCode.replace(regExp, macrosMap[macros]);
        });
        return htmlCode;
    }
}
