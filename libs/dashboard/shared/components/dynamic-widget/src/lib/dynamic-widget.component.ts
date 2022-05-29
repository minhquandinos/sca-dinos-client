import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    Input,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { dynamicComponentLookupRegistry } from '@scaleo/core/decorators/common';
import { DashboardWidgetModel } from '@scaleo/dashboard/common';

// import { DashboardWidgetsFactory } from '../../../../../../../apps/scaleo/src/app/panel/shared/components/dashboard/shared/classes/dashboard-widgets.factory';

@Component({
    selector: 'app-dynamic-widget',
    template: ` <ng-template #containerRef></ng-template> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWidgetComponent implements AfterViewInit, OnDestroy {
    // @Input() component: Type<any>;
    @Input() widget: DashboardWidgetModel;

    @ViewChild('containerRef', { read: ViewContainerRef }) containerRef: ViewContainerRef;

    private componentRef: ComponentRef<any>;

    ngAfterViewInit(): void {
        const componentRef = dynamicComponentLookupRegistry.get(this.widget.identifier);
        if (componentRef) {
            this.componentRef = this.containerRef.createComponent(componentRef);
            this.componentRef.instance.widget = this.widget;
            this.componentRef.changeDetectorRef.detectChanges();
        }
    }

    ngOnDestroy() {
        this.componentRef?.changeDetectorRef?.detach();
    }
}
