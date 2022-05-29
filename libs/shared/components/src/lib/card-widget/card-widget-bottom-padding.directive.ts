import { Directive, OnInit, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { UiPageWrapperComponent } from '../../../../../ui-kit/elements/src/lib/ui-page-wrapper/ui-page-wrapper.component';
import { CardWidgetComponent } from './card-widget.component';

@Directive({
    selector: '[appCardWidgetBottomPadding]',
    providers: [ResizeObserverService, UnsubscribeService]
})
export class CardWidgetBottomPaddingDirective implements OnInit {
    constructor(
        private readonly host: UiPageWrapperComponent,
        private readonly renderer: Renderer2,
        private readonly parent: CardWidgetComponent,
        private readonly resizeObserverService: ResizeObserverService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        if (this.parent.autoSetBottomPaddingWhenFooterEmpty) {
            this.observerHost();
        }
    }

    private observerHost(): void {
        const hostNode = this.host?.pageRef.nativeElement;
        this.resizeObserverService
            .observe(hostNode)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((element) => {
                const children = element.entry?.target?.children;
                if (children.length) {
                    const footerNode = Array.from(children).find((el) => el.nodeName.toLowerCase() === 'ui-page-wrapper-footer');
                    const hasPadding = footerNode?.classList.contains('pb-1');
                    if (!footerNode && !hasPadding) {
                        this.renderer.addClass(hostNode, 'pb-1');
                    }

                    if (footerNode && hasPadding) {
                        this.renderer.removeClass(hostNode, 'pb-1');
                    }
                }
            });
    }
}
