import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, of, take } from 'rxjs';
import { share, switchMap, takeUntil } from 'rxjs/operators';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { GettingStartedService, RoutesForGettingStarted } from '@scaleo/feature/manager/getting-started/data-access';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'manager-getting-started-pages',
    templateUrl: './getting-started-pages.component.html',
    providers: [UnsubscribeService]
})
export class GettingStartedPagesComponent implements OnInit {
    routerMap$: Observable<RoutesForGettingStarted[]> = this.gettingStartedService.routerMap$;

    showHideGettingStartedMenuButton: Observable<boolean> = this.gettingStartedService.showGettingStarted$.pipe(share());

    @ViewChild('modalMessageTpl') modalMessageTpl: TemplateRef<HTMLElement>;

    constructor(
        private readonly gettingStartedService: GettingStartedService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly profileQuery: ProfileQuery,
        private readonly newProfileService: NewProfileService,
        private readonly modal3: Modal3Service,
        private readonly translate: TranslateService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.gettingStartedService
            .getCompleteStages()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                if (this.gettingStartedService.completeAllStages) {
                    setTimeout(() => {
                        this.hideGettingStartedMenu();
                    });
                }
            });
        // TODO ??
        // this.gettingStartedService.routerMap.subscribe();
    }

    hideGettingStartedMenu(): void {
        const modalRef$ = this.modal3.confirm(this.modalMessageTpl, {
            title: this.translate.instant('getting_started.hide_getting_started'),
            actionLabel: this.translate.instant('interface.basic.hide'),
            typeButton: 'main'
        });

        modalRef$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap((event) => {
                    if (event) {
                        return this.gettingStartedService.hideGettingStarted().pipe(switchMap(() => this.newProfileService.get()));
                    }
                    return of(null);
                }),
                take(1)
            )
            .subscribe(() => {
                this.router.navigate(['../dashboard'], { relativeTo: this.route });
            });
    }
}
