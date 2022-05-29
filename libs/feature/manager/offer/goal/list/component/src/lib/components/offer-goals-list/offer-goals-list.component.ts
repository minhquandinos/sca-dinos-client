import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { OFFER_GOALS_COLUMNS_TOKEN, offerGoalColumnListFactory } from '@scaleo/feature/manager/offer/goal/common';
import { OfferGoalListModel } from '@scaleo/feature/manager/offer/goal/list/data-access';
import { GoalTypeEnum } from '@scaleo/platform/list/access-data';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { offerGoalListColumnsWidgetConfig } from './config/offer-goal-list-columns-widget.config';

@Component({
    selector: 'scaleo-offer-goals-list',
    templateUrl: './offer-goals-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [offerGoalColumnListFactory(offerGoalListColumnsWidgetConfig)]
})
export class OfferGoalsListComponent {
    @Input() items: OfferGoalListModel[] = [];

    @Input() loading: boolean;

    @Output() openEditForm: EventEmitter<number> = new EventEmitter<number>();

    readonly goalTypeEnum = GoalTypeEnum;

    constructor(@Inject(OFFER_GOALS_COLUMNS_TOKEN) public readonly columns: UiTable2ColumnsModel[]) {}

    openModal(id: number) {
        this.openEditForm.emit(id);
    }
}
