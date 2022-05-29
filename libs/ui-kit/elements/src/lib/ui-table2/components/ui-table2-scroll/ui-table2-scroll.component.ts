import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { UiTable2ScrollService } from '../../services/ui-table2-scroll.service';

@Component({
    selector: 'ui-table2-scroll',
    templateUrl: './ui-table2-scroll.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class UiTable2ScrollComponent implements OnInit {
    @Input() tableElement: HTMLTableElement;

    @ViewChild('containerElement', { static: true }) containerElement: ElementRef;

    @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private scrollService: UiTable2ScrollService,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.scrollService.setScrollContainer(this.containerElement);
        this.scrollService.scrollWidth$.pipe(takeUntil(this.unsubscribe)).subscribe((width) => {
            this.renderer.setStyle(this.scrollElement.nativeElement, 'width', `${width}px`);
        });
    }
}
