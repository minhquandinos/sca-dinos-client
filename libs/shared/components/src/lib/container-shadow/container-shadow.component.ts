import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

interface ContainerShadowPositionModel {
    top: boolean;
    bottom: boolean;
}

@Component({
    selector: 'app-container-shadow',
    templateUrl: './container-shadow.component.html',
    providers: [UnsubscribeService, ResizeObserverService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerShadowComponent implements OnInit, OnDestroy {
    @Input() maxHeight = 'auto';

    @Input() shadowOnScroll: boolean;

    @Input() shadowTop: boolean;

    @Input() shadowBottom: boolean;

    @HostBinding('class')
    private readonly hostClass = 'container-shadow-on-scroll d-block';

    @ViewChild('scrollContainer', { static: true })
    private readonly scrollContainer: ElementRef;

    private containerHeight = 0;

    private containerScrollHeight = 0;

    private listenFn: () => void;

    containerShadowPosition: ContainerShadowPositionModel = {
        top: false,
        bottom: false
    };

    constructor(
        private readonly resize: ResizeObserverService,
        private readonly renderer: Renderer2,
        private readonly unsubscribe: UnsubscribeService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.initShadowOnScroll();
        this.initStaticShadow();
    }

    ngOnDestroy() {
        if (this.listenFn) {
            this.listenFn();
        }
    }

    private listenScroll(): void {
        this.listenFn = this.renderer.listen(this.scrollContainer.nativeElement, 'scroll', (event) => {
            const { scrollTop } = event.target as Element;
            this.setShadow(scrollTop);
        });
    }

    private setShadow(scroll: number): void {
        const container = this.containerScrollHeight - this.containerHeight;
        const scrollOnTop = scroll === 0 && scroll <= container;
        const scrollOnButton = scroll === container;
        const scrollOnCenter = scroll > 0 && scroll < container;
        this.containerShadowPosition = {
            top: scrollOnCenter || !scrollOnTop,
            bottom: scrollOnCenter || !scrollOnButton
        };
        this.cdr.detectChanges();
    }

    private initShadowOnScroll(): void {
        if (this.shadowOnScroll) {
            this.resize
                .observe(this.scrollContainer.nativeElement)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(({ height, entry }) => {
                    this.containerHeight = height;
                    this.containerScrollHeight = entry.target.scrollHeight;
                    this.setShadow(0);
                    this.listenScroll();
                });
        }
    }

    private initStaticShadow(): void {
        if ((this.shadowTop || this.shadowBottom) && !this.shadowOnScroll) {
            this.containerShadowPosition = {
                top: this.shadowTop,
                bottom: this.shadowBottom
            };
        }
    }
}
