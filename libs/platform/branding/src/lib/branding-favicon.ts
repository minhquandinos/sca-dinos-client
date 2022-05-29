import { BrandingInterface } from './branding.interface';

export class BrandingFavicon implements BrandingInterface {
    constructor(private document: HTMLDocument, private icon: string) {}

    set() {
        const head = this.document.querySelector('head');
        const favicon = head.querySelector('#appFavicon');
        if (this.icon) {
            if (favicon) {
                favicon.setAttribute('href', this.icon);
            } else {
                const linkElement = this.document.createElement('link');
                linkElement.id = 'appFavicon';
                linkElement.rel = 'icon';
                linkElement.type = 'image/png';
                linkElement.href = this.icon;
                head.appendChild(linkElement);
            }
        } else if (favicon) {
            favicon.setAttribute('href', null);
        }
    }

    // public defaultFavicon() {
    //     this.document.getElementById('appFavicon').setAttribute('href', 'assets/img/favicon.ico');
    // }
}
