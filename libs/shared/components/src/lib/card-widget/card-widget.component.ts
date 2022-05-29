import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    HostBinding,
    Input,
    ViewChild
} from '@angular/core';

import { UiPageWrapperComponent } from '../../../../../ui-kit/elements/src/lib/ui-page-wrapper/ui-page-wrapper.component';
import { CardWidgetContentComponent } from './card-widget-content.component';
import { CardWidgetFooterComponent } from './card-widget-footer.component';
import { CardWidgetHeaderComponent } from './card-widget-header.component';

@Component({
    selector: 'app-card-widget',
    template: `
        <ui-page-wrapper appCardWidgetBottomPadding #uiPageWrapperComponent [className]="innerClassName" borderRadius="4">
            <ng-template [ngTemplateOutlet]="headerComponent?.template"></ng-template>

            <ng-template [ngTemplateOutlet]="contentComponent?.template"></ng-template>

            <ng-container [ngTemplateOutlet]="footerComponent?.template"></ng-container>
        </ui-page-wrapper>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardWidgetComponent implements AfterContentChecked {
    @HostBinding('class') hostClass = 'card-widget d-block';

    @Input() innerClassName: string;

    @Input() autoSetBottomPaddingWhenFooterEmpty = false;

    @ContentChild(CardWidgetHeaderComponent)
    headerComponent: CardWidgetHeaderComponent;

    @ContentChild(CardWidgetContentComponent)
    contentComponent: CardWidgetContentComponent;

    @ContentChild(CardWidgetFooterComponent)
    footerComponent: CardWidgetFooterComponent;

    @ViewChild(UiPageWrapperComponent, { static: true })
    uiPageWrapperComponent: UiPageWrapperComponent;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentChecked() {
        this.cdr.markForCheck();
    }
}
