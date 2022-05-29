export class BrandingColor {
    constructor(private document: Document) {}

    private static shadeColor2(color: string, percent: any): string {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const B = ((num >> 8) & 0x00ff) + amt;
        const G = (num & 0x0000ff) + amt;
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
            (G < 255 ? (G < 1 ? 0 : G) : 255)
        )
            .toString(16)
            .slice(1)}`;
    }

    public setLinksColor(color: string): void {
        this.setStyleForElement('--main-links-color', color);
    }

    public setMainColor(color: string): void {
        this.setStyleForElement('--main-bg-color', color);
        this.setStyleForElement('--second-bg-color', BrandingColor.shadeColor2(color, -5));
    }

    private setStyleForElement(element: string, color: string): void {
        this.document.querySelector('html').style.setProperty(element, color);
    }

    private shadeColor(color: string, amount: number): string {
        return `#${color
            .replace(/^#/, '')
            .replace(/../g, (value) => `0${Math.min(255, Math.max(0, parseInt(value, 16) + amount)).toString(16)}`.substr(-2))}`;
    }
}
