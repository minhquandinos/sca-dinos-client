import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { DetectedClientDeviceService } from '@scaleo/core/detected-clinet-device/service';
import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { PageContentService } from '@scaleo/core/page-content/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { PanelLayoutService } from '../../services/panel-layout.service';

@Component({
    selector: 'ui-panel-layout',
    templateUrl: './panel-layout.component.html',
    providers: [UnsubscribeService]
})
export class PanelLayoutComponent implements OnInit, AfterViewInit {
    readonly currentLang$ = this.translate.onLangChange.pipe(
        filter((event) => !!event),
        map((event) => event.lang),
        debounceTime(0)
    );

    clientDevice!: string;

    readonly isMobile$ = this.panelLayoutService.isMobile$;

    readonly isNotMobile$ = this.panelLayoutService.isNotMobile$;

    readonly collapseMenu$ = this.panelLayoutService.collapseMenu$;

    readonly mobileMenu$ = this.panelLayoutService.mobileMenu$;

    menuClass!: string;

    @ViewChild('pageContentRef') set pageContentRef(element: ElementRef) {
        if (element) {
            this.pageContentService.setElementRef(element);
        }
    }

    constructor(
        private readonly translate: TranslateService,
        private readonly mediaWatcherService: MediaWatcherService,
        private readonly detectedClientDeviceService: DetectedClientDeviceService,
        private readonly route: ActivatedRoute,
        private readonly unsubscribe: UnsubscribeService,
        private readonly panelLayoutService: PanelLayoutService,
        private pageContentService: PageContentService,
        private router: Router
    ) {}

    ngOnInit() {
        this.detectClientDevice();

        this.route.data.pipe(takeUntil(this.unsubscribe)).subscribe((data) => {
            if (data?.menuClass) {
                this.menuClass = data?.menuClass;
            }
        });

        this.isMobile$.pipe(takeUntil(this.unsubscribe)).subscribe((isMobile) => {
            this.panelLayoutService.setMobileMenu(isMobile);
        });

        this.mediaWatcherService.breakpointObserver
            .observe(['(max-width: 1079px)', '(min-width: 1400px)'])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(({ matches }) => {
                this.panelLayoutService.setCollapseMenu(!matches);
            });
    }

    ngAfterViewInit(): void {
        this.scrollToTopWhenChangeRoute();
    }

    private detectClientDevice(): void {
        const detect = this.detectedClientDeviceService.detected();
        if (detect) {
            this.clientDevice = `client-device-${detect}`;
        }
    }

    collapseMenuBar() {
        this.panelLayoutService.collapseMenu();
    }

    toggleMobileMenu() {
        this.panelLayoutService.toggleMobileMenu();
    }

    // TODO refactor, see docs for angular router param on config scrollPositionRestoration
    private scrollToTopWhenChangeRoute(): void {
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            if (this.pageContentService.nativeElement) {
                this.pageContentService.elementRef.nativeElement.scrollTo(0, 0);
            }
        });
    }
}
