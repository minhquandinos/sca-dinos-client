import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';

import { DetailInfoWidgetContentComponent } from './components/detail-info-widget-content.component';
import { DetailInfoWidgetHeaderComponent } from './components/detail-info-widget-header.component';

@Component({
    selector: 'app-detail-info-widget',
    templateUrl: 'detail-info-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoWidgetComponent {
    @Input() isLoad: boolean;

    @ContentChild(DetailInfoWidgetHeaderComponent, { static: true })
    readonly header: DetailInfoWidgetHeaderComponent;

    @ContentChild(DetailInfoWidgetContentComponent, { static: true })
    readonly content: DetailInfoWidgetContentComponent;
}
