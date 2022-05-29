import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input } from '@angular/core';

import { DayPresetChangedModel } from '@scaleo/shared/components';

import { DetailWidgetWrapperInterface } from './detail-widget-wrapper.interface';
import { DETAIL_WIDGET_WRAPPER_TOKEN } from './detail-widget-wrapper.token';

@Component({
    selector: 'scaleo-detail-widget-wrapper',
    templateUrl: './detail-widget-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DETAIL_WIDGET_WRAPPER_TOKEN,
            useExisting: DetailWidgetWrapperComponent
        }
    ]
})
export class DetailWidgetWrapperComponent {
    @ContentChild(DETAIL_WIDGET_WRAPPER_TOKEN as any, { static: true })
    topWidget: DetailWidgetWrapperInterface;

    @HostBinding('class')
    hostClass = 'dashboard-top';

    @Input() title: string;

    updateDate({ rangeFrom, rangeTo, selectedRange }: DayPresetChangedModel): void {
        this.topWidget.updateDate(rangeFrom, rangeTo, selectedRange);
    }
}
