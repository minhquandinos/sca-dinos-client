import { ChangeDetectorRef, Component, HostBinding, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { OffersLayoutContainersEnum, OffersLayoutContainersType } from './offers-layout.model';

@Component({
    selector: 'app-offers-layout',
    templateUrl: './offers-layout.component.html'
})
export class OffersLayoutComponent {
    @ViewChild('filterContainer', { read: ViewContainerRef, static: true })
    private readonly filterContainer: ViewContainerRef;

    @ViewChild('footerContainer', { read: ViewContainerRef, static: true })
    private readonly footerContainer: ViewContainerRef;

    @ViewChild('openModalContainer', { static: false, read: ViewContainerRef }) set setOpenModalContainer(container: ViewContainerRef) {
        this.createEmbeddedViewForContainer(this.openModalTpl, container);
    }

    @ViewChild('openModalContainer', { read: ViewContainerRef, static: false })
    private readonly openModalContainer: ViewContainerRef;

    @ViewChild('hintContainer', { read: ViewContainerRef, static: true })
    private readonly hintContainer: ViewContainerRef;

    @ViewChild('upgradeContainer', { read: ViewContainerRef, static: true })
    private readonly upgradeContainer: ViewContainerRef;

    // @ViewChild('navigationContainer', { read: ViewContainerRef, static: true })
    // private readonly navigationContainer: ViewContainerRef;

    private openModalTpl: TemplateRef<HTMLElement>;

    @HostBinding('class') hostClass = 'offers-layout';

    constructor(private cdr: ChangeDetectorRef) {}

    public createContainer(template: TemplateRef<HTMLElement>, type: OffersLayoutContainersType) {
        const container = this.getContainerByType(type);
        if (container) {
            this.createEmbeddedViewForContainer(template, container);
        } else if (type === OffersLayoutContainersEnum.OpenModal) {
            this.openModalTpl = template;
        }
    }

    private createEmbeddedViewForContainer(template: TemplateRef<HTMLElement>, container: ViewContainerRef) {
        if (container && template) {
            container.clear();
            container.createEmbeddedView(template);
            this.cdr.detectChanges();
        }
    }

    public clearContainer(type: OffersLayoutContainersType) {
        this.getContainerByType(type)?.clear();
    }

    private getContainerByType(type: OffersLayoutContainersType): ViewContainerRef {
        switch (type) {
            case OffersLayoutContainersEnum.Filter:
                return this.filterContainer;
            case OffersLayoutContainersEnum.Footer:
                return this.footerContainer;
            case OffersLayoutContainersEnum.Hint:
                return this.hintContainer;
            // case OffersLayoutContainersEnum.Upgrade:
            //     return this.upgradeContainer;
            // case OffersLayoutContainersEnum.Navigation:
            //     return this.navigationContainer;
            case OffersLayoutContainersEnum.OpenModal:
                return this.openModalContainer || null;
            default:
                return null;
        }
    }
}
