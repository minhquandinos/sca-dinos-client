import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { GoalConverterInput, GoalOfferModel, TrackingDomainsInterface } from '@scaleo/offer/common';
import { GoalsConverter } from '@scaleo/offer/goal/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { CustomTranslatePipe } from '@scaleo/shared/pipes';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

import { OFFER_PROFILE_GOALS_TABLE_COLUMNS_TOKEN } from './config/offer-profile-goals-table-columns.provider';

@Component({
    selector: 'scaleo-offer-goals-old-widget',
    templateUrl: './offer-goals-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GoalsConverter]
})
export class OfferGoalsCardComponent implements OnDestroy {
    @Input() set goalsData([goals, tracking]: [GoalOfferModel[], TrackingDomainsInterface]) {
        if (goals && tracking) {
            this.showDefaultButton = goals.filter((item) => item.goal_type !== 1).length > 1;
            this.goals = this.limit ? goals.slice(0, this.limit) : goals;
            this.setTrackingLink(tracking);
            this.setConversionStatus();
            this.loadGoals = true;
        }
    }

    @Input() currency: CurrencyEnum;

    @Input() limit: number;

    @Input() rowTemplate: TemplateRef<any>;

    goals: GoalOfferModel[];

    headers: UiTableHeaderInterface[] = this.tableColumns;

    trackingLink = '';

    showDefaultButton: boolean;

    loadGoals = false;

    dataForConversionStatus = [
        { id: 2, conversion_status_as_string: 'approved', label: 'A' },
        { id: 3, conversion_status_as_string: 'pending', label: 'P' },
        { id: 4, conversion_status_as_string: 'rejected', label: 'R' }
    ];

    @ViewChild('listContainer', { read: ViewContainerRef }) listContainer: ViewContainerRef;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private converter: GoalsConverter,
        private mediaWatcherService: MediaWatcherService,
        @Inject(OFFER_PROFILE_GOALS_TABLE_COLUMNS_TOKEN) private tableColumns: UiTableHeaderInterface[]
    ) {}

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private setTrackingLink(tracking: TrackingDomainsInterface): void {
        this.trackingLink = tracking ? tracking.name : '';
    }

    private setConversionStatus(): void {
        this.goals = this.goals?.map((item: GoalOfferModel) => {
            const dataConvStatus = this.dataForConversionStatus.find((itemConv) => item.conversion_status === itemConv.id);

            const inputForConvertTrackingCode: GoalConverterInput = {
                trackingType: item.tracking_method,
                goalId: item.goal_id,
                typeGoal: item.goal_type,
                trackingLink: this.trackingLink,
                alias: item.alias,
                goalIsDefault: item.isDefault
            };

            const trackingMethod = item?.tracking_method_title ? CustomTranslatePipe.convertTitle(item?.tracking_method_title) : '';
            return Util.cloneObject(item, {
                tracking_method_title: trackingMethod,
                tracking_code: this.converter.convertTrackingCode(inputForConvertTrackingCode),
                conversion_status_as_string: dataConvStatus?.conversion_status_as_string
            });
        });
    }
}
