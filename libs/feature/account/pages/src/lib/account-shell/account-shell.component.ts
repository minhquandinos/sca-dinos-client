import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { debounceTime, interval, takeUntil } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { AdblockInfoBarComponent } from '@scaleo/core/adblock/info-bar';
import { AdBlockService } from '@scaleo/core/adblock/service';
import { DetectedClientDeviceService } from '@scaleo/core/detected-clinet-device/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { VersionService } from '@scaleo/core/version/service';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { RefreshVersionComponent } from '@scaleo/shared/components2/refresh-version';
import { ViewBelongAccountComponent } from '@scaleo/shared/components2/view-belong-account';
import { SnackBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-account-shell',
    templateUrl: './account-shell.component.html',
    providers: [UnsubscribeService]
})
export class AccountShellComponent implements OnInit {
    private _roleClassName: string;

    constructor(
        private readonly snackBarService: SnackBarService,
        @Inject(DOCUMENT) private document: Document,
        private detectedClientDeviceService: DetectedClientDeviceService,
        private readonly profileQuery: ProfileQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly authenticationService: AuthenticationService,
        private readonly adBlockService: AdBlockService,
        private readonly renderer: Renderer2,
        private readonly versionService: VersionService
    ) {}

    ngOnInit(): void {
        this.initPanel();
        //
        // this.router.events
        //     .pipe(
        //         filter((event) => event instanceof NavigationEnd),
        //         takeUntil(this.unsubscribe)
        //     )
        //     .subscribe((event: NavigationEnd) => {
        //         const match = new RegExp('dashboard', 'g');
        //         if (match.test(event.url)) {
        //             this.clearFilterService.clearTempFilters();
        //         }
        //     });
    }

    addProfileClassToBody(role: BaseRoleType): void {
        if (this.profileQuery.slug) {
            const body = this.document.querySelector('body');
            const roleClassName = `role-${this.profileQuery.baseRole.replace('base_', '').toLowerCase()}`;
            this._roleClassName = roleClassName;

            if (this._roleClassName) {
                this.renderer.removeClass(body, this._roleClassName);
            }

            if (roleClassName) {
                this.renderer.addClass(body, roleClassName);
            }
        }
    }

    private initPanel(): void {
        this.adBlock();
        this.detectClientDevice();

        this.viewBelongAccount();
        this.refreshVersions();
    }

    private adBlock(): void {
        if (this.adBlockService.adBlock) {
            const snackBarId = Symbol('AdBlock');
            this.snackBarService.open({
                id: snackBarId,
                emptyContainer: true,
                positionVertically: {
                    position: 'top'
                },
                positionHorizontally: {
                    position: 'centerHorizontally'
                },
                component: {
                    entity: AdblockInfoBarComponent
                }
            });
        }
    }

    private detectClientDevice(): void {
        const detect = this.detectedClientDeviceService.detected();
        if (detect) {
            this.document.querySelector('body').classList.add(`client-device-${detect}`);
        }
    }

    private viewBelongAccount(): void {
        const snackBarId = Symbol('ViewBelongAccountComponent');
        this.profileQuery.baseRole$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap((baseRole) => {
                    this.addProfileClassToBody(baseRole);
                }),
                tap((baseRole) => {
                    if (baseRole && baseRole !== BASE_ROLE.admin && this.authenticationService.isAuthenticatedFromParentRole) {
                        // const injector = Injector.create({
                        //     providers: [{ provide: VIEW_BELONG_ACCOUNT_TOKEN, useValue: { test: 'test module' } }],
                        //     parent: this.injector
                        // });
                        this.snackBarService.open({
                            id: snackBarId,
                            component: {
                                entity: ViewBelongAccountComponent
                            }
                        });
                    } else {
                        this.snackBarService.close(snackBarId);
                    }
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private refreshVersions(): void {
        const snackBarId = Symbol('refresh');
        this.versionService.show$
            .pipe(
                filter((status) => status),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.snackBarService.open({
                    id: snackBarId,
                    emptyContainer: true,
                    positionVertically: {
                        position: 'bottom'
                    },
                    positionHorizontally: {
                        position: 'left'
                    },
                    component: {
                        entity: RefreshVersionComponent
                    }
                });
            });
    }
}
