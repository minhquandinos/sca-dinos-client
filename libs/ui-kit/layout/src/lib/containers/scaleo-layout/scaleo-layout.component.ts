import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { ScaleoLayoutType } from '../../types/scaleo-layout.type';

@Component({
    selector: 'ui-layout',
    templateUrl: './scaleo-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [UnsubscribeService]
})
export class ScaleoLayoutComponent implements OnInit {
    layout: ScaleoLayoutType;

    constructor(private readonly route: ActivatedRoute, private readonly unsubscribe: UnsubscribeService) {}

    ngOnInit(): void {
        this.updateLayout();
    }

    private updateLayout(): void {
        this.route.data.pipe(takeUntil(this.unsubscribe)).subscribe(({ layout }) => {
            if (layout) {
                this.layout = layout;
            }
        });
    }
}
