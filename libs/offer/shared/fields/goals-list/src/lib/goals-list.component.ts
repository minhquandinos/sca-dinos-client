import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { GoalInterface, GoalOfferModel, GoalTypesEnum } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';

@Component({
    selector: 'app-goals-list',
    templateUrl: './goals-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalsListComponent implements OnChanges {
    @Input() goals: GoalInterface[] | GoalOfferModel[] = [];

    @Input() currency: CurrencyEnum;

    @Input()
    affiliateTemplateRowAndTooltip = false;

    @ViewChild('affiliateRowTemplate', { static: true }) private affiliateRowTemplate: TemplateRef<any>;

    @ViewChild('affiliateTooltipTemplate', { static: true }) private affiliateTooltipTemplate: TemplateRef<any>;

    @ViewChild('defaultRowTemplate', { static: true }) private defaultRowTemplate: TemplateRef<any>;

    @ViewChild('defaultTooltipTemplate', { static: true }) private defaultTooltipTemplate: TemplateRef<any>;

    public templateRow: TemplateRef<any>;

    public templateTooltip: TemplateRef<any>;

    public readonly goalTypeEnum = GoalTypesEnum;

    ngOnChanges(changes: SimpleChanges) {
        const { affiliateTemplateRowAndTooltip } = changes;

        if (affiliateTemplateRowAndTooltip?.currentValue) {
            this.templateRow = this.affiliateRowTemplate;
            this.templateTooltip = this.affiliateTooltipTemplate;
        } else {
            this.initDefaultTemplateRowAndTooltip();
        }
    }

    private initDefaultTemplateRowAndTooltip(): void {
        this.templateRow = this.defaultRowTemplate;
        this.templateTooltip = this.defaultTooltipTemplate;
    }
}
