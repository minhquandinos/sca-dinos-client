import { AfterContentChecked, AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

import { UiTabChangeTabEventModel } from '@scaleo/ui-kit/elements';

import { UiTabItemComponent } from './ui-tab-item.component';

@Component({
    template: ``
})
export abstract class BaseTabComponent implements AfterContentInit, AfterContentChecked {
    @Input() className: string;

    @Input() headerClassName: string;

    @Input() contentClassName: string;

    @Input() headerSticky = false;

    @Output() changeTab: EventEmitter<UiTabChangeTabEventModel> = new EventEmitter<UiTabChangeTabEventModel>();

    @ContentChildren(UiTabItemComponent)
    tabs: QueryList<UiTabItemComponent>;

    tabItems$: Observable<UiTabItemComponent[]>;

    activeTab: UiTabItemComponent;

    ngAfterContentInit(): void {
        this.tabItems$ = this.tabs.changes.pipe(
            startWith(''),
            delay(0),
            map((): any => this.tabs.toArray())
        );
    }

    ngAfterContentChecked() {
        if (!this.activeTab) {
            // if this component has been problem, try use setTimeout
            Promise.resolve().then(() => {
                const activeTab = this.tabs.find((item) => item?.isActive);
                this.activeTab = activeTab || this.tabs.first;
            });
        }
    }

    selectTab(tabItem: UiTabItemComponent) {
        if (this.activeTab === tabItem) {
            return;
        }

        if (this.activeTab) {
            this.activeTab.isActive = false;
        }

        this.activeTab = tabItem;

        tabItem.isActive = true;
        this.tabs.forEach((tab, index) => {
            if (tab === this.activeTab) {
                this.changeTab.emit({ index, name: tab?.name });
            }
        });
    }
}
