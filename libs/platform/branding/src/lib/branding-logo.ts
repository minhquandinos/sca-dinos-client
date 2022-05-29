export class BrandingLogo {
    constructor(private document: Document) {}

    setLogo(logo: string): { background: string } {
        return {
            background: `url(${logo})`
        };
    }

    public defaultLogo(): void {
        const logoSelectors = this.document.querySelectorAll('.menu-header__logo');
        logoSelectors.forEach((selector) => {
            (selector as HTMLElement).setAttribute('style', '');
        });
    }
}
