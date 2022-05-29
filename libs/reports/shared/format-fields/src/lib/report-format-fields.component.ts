import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReportType } from '@scaleo/reports/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ReportFieldsMap } from './shared/classes/report-fields-map';

@Component({
    selector: 'app-report-col-fields',
    templateUrl: './report-format-fields.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFormatFieldsComponent implements OnChanges, OnDestroy {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() set data([key, item, isBreakdown]: [string, any, boolean]) {
        // this.clearFields();
        // if (key && item) {
        //     this.item = item;
        //     this.key = key;
        //     this.isBreakdown = isBreakdown || false;
        //
        //     this.createComponent();
        // } else {
        //     this.clearComponent();
        // }
    }

    @Input() _key: string;

    @Input() _item: any;

    @Input() _isBreakdown = false;

    @Input() _isTotals = false;

    @Input() filterData: RequestPayloadFilter2Interface;

    @Input() breakdown: BreakdownEnum;

    isBreakdown: boolean;

    @Input() currency: CurrencyEnum;

    @Input() reportType: keyof Record<ReportType, string>;

    @Input() className: string;

    @ViewChild('containerRef', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnChanges(changes: SimpleChanges) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _key, _isBreakdown } = changes;

        this.clearComponent();
        if (this.changeKey(_key) && this.changeBreakdown(_isBreakdown)) {
            this.createComponent();
        }
    }

    private changeBreakdown(breakdown: SimpleChange): boolean {
        return breakdown?.currentValue === undefined || breakdown?.currentValue === false || !!breakdown?.currentValue;
    }

    private changeKey(key: SimpleChange): boolean {
        return !!key?.currentValue || !!this._key;
    }

    ngOnDestroy() {
        this.containerRef.clear();
    }

    createComponent() {
        const component = ReportFieldsMap.getComponent(this._key);
        if (component && this._key && this._item) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            const componentRef: any = this.containerRef.createComponent(componentFactory);
            componentRef.instance['isBreakdown'] = this._isBreakdown;
            componentRef.instance['key'] = this._key;
            componentRef.instance['item'] = this._item;
            componentRef.instance['reportType'] = this.reportType;
            componentRef.instance['isTotals'] = this._isTotals;
            componentRef.instance['currency'] = this.currency;
            if (this.filterData) {
                componentRef.instance['filterData'] = this.filterData;
            }

            if (this.breakdown) {
                componentRef.instance['breakdown'] = this.breakdown;
            }

            componentRef.changeDetectorRef.detectChanges();
        }
    }

    private clearComponent() {
        this.containerRef.clear();
    }

    private clearFields() {
        this._item = null;
        this._key = null;
        this._isBreakdown = false;
    }
}
