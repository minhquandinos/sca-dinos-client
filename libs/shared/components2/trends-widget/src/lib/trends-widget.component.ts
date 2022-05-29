import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DayPresetChangedModel, DayPresetsComponent } from '@scaleo/shared/components';
import { UiTabChangeTabEventModel, UiTabComponent } from '@scaleo/ui-kit/elements';

import { TrendTabDirective } from './directives/trend-tab.directive';
import { TrendsWidgetModel } from './models/trends-widget.model';
import { TrendsWidgetService } from './services/trends-widget.service';

@Component({
    selector: 'app-trends-widget',
    templateUrl: './trends-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TrendsWidgetService]
})
export class TrendsWidgetComponent implements AfterViewInit {
    @Input() showDatePresets = true;

    date$ = this.trendsWidgetService.update$;

    date = this.trendsWidgetService.selectedPreset;

    widgetTabs: TrendsWidgetModel[] = [];

    @ContentChildren(TrendTabDirective)
    readonly tabs: QueryList<TrendTabDirective>;

    @ViewChild(UiTabComponent, { static: true })
    readonly uiTabComponent: UiTabComponent;

    @ViewChild(DayPresetsComponent)
    set dayPresetsComponent(component: DayPresetsComponent) {
        if (component && !this._dayPresetsComponent) {
            this.changePreset(component.selected);
            this._dayPresetsComponent = component;
        }
    }

    @Output() activeTab: EventEmitter<number> = new EventEmitter();

    private _dayPresetsComponent: DayPresetsComponent;

    constructor(private readonly trendsWidgetService: TrendsWidgetService, private readonly translate: TranslateService) {}

    ngAfterViewInit(): void {
        this.tabs.forEach((tab) => {
            this.widgetTabs.push({
                label: this.translate.stream(tab.label),
                template: tab.hostTemplate
            });
        });
    }

    trackByFn(index: number) {
        return index;
    }

    changeTab(event: UiTabChangeTabEventModel): void {
        this.activeTab.emit(event.index);
    }

    changePreset(event: DayPresetChangedModel) {
        this.trendsWidgetService.updateActiveComponent(event);
    }
}
