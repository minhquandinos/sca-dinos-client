import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OfferPromoteWidgetItemsModel } from '@scaleo/feature-affiliate-dashboard-widgets-offer-promote-data-access';
import { OfferUrlsTypesEnum } from '@scaleo/offer/common';
import { OfferVisibilityUtil } from '@scaleo/offer/shared/fields/offer-visibility';

@Component({
    selector: 'app-offer-promote-actions',
    template: `
        <ui-svg-icon
            *ngIf="approvedOffer"
            className="custom-dashboard-widget-offer_promote-control__icon"
            icon="more-verticale"
        ></ui-svg-icon>
        <div class="custom-dashboard-widget-offer_promote-control__actions">
            <ui-button-link
                *ngIf="approvedOffer"
                className="custom-dashboard-widget-offer_promote-control__action"
                type="text"
                icon="link_builder"
                (click)="linkBuilderHandler()"
                [label]="'dashboard_grid.widget.offer_promote.get_link' | translate"
            ></ui-button-link>
            <div class="custom-dashboard-widget-offer_promote-control__action-divider" *ngIf="approvedOffer && previewLink"></div>
            <ui-button-link
                *ngIf="previewLink"
                className="custom-dashboard-widget-offer_promote-control__action"
                type="text"
                icon="eye3"
                [label]="'interface.basic.preview' | translate"
                (click)="preview()"
            ></ui-button-link>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferPromoteActionsComponent implements OnInit {
    @Input()
    item: OfferPromoteWidgetItemsModel;

    @Output()
    openLinkBuilder: EventEmitter<OfferPromoteWidgetItemsModel> = new EventEmitter<OfferPromoteWidgetItemsModel>();

    approvedOffer = true;

    previewLink: string;

    ngOnInit(): void {
        this.check();
        this.findPreviewLink();
    }

    linkBuilderHandler() {
        this.openLinkBuilder.emit(this.item);
    }

    private check() {
        this.approvedOffer = OfferVisibilityUtil.checkOfferRequestStatus(this.item.visible_type_selected);
    }

    private findPreviewLink() {
        // TODO move method to offer util functions
        const findLink = this.item.links.find((link) => link.type === OfferUrlsTypesEnum.Preview);

        if (findLink) {
            this.previewLink = findLink.url;
        }
    }

    preview() {
        if (this.previewLink) {
            window.open(this.previewLink, '_blank');
        }
    }
}
