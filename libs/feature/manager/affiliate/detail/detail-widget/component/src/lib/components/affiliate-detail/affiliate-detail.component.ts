import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, defer, filter, Observable, of, startWith, Subject, switchMap, tap, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { NAVIGATION_PATH_TOKEN } from '@scaleo/core/navigation/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_DETAIL_WIDGET_PROVIDER,
    AffiliateDetailWidgetModel,
    AffiliateDetailWidgetService
} from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { AffiliateCreateComponent } from '@scaleo/feature/manager/affiliate/upsert/modal-form';
import { ManagerPathResolverType } from '@scaleo/feature/manager/core/navigation';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-affiliate-detail',
    templateUrl: './affiliate-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UnsubscribeService,
        AFFILIATE_DETAIL_WIDGET_PROVIDER,
        ConfigCustomFieldService,
        { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'aff_custom_fields' }
    ]
})
export class AffiliateDetailComponent {
    @Input() set affiliateId(id: number) {
        this._affiliateId$.next(id);
    }

    @Output()
    affiliate: EventEmitter<AffiliateDetailWidgetModel> = new EventEmitter<AffiliateDetailWidgetModel>(undefined);

    @Output()
    changed: EventEmitter<void> = new EventEmitter();

    private _affiliateId$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

    private _update$: Subject<void> = new Subject<void>();

    readonly canAccessAffiliates$ = this.checkPermissionService.check$(this.permissions.canAccessAffiliates);

    affiliateData$: Observable<AffiliateDetailWidgetModel> = this._update$.pipe(
        startWith(''),
        switchMap(() =>
            this._affiliateId$.pipe(
                filter((id) => !!id),
                switchMap((id) => {
                    console.log();
                    return defer(() =>
                        this.checkPermissionService.check(this.permissions.canAccessAffiliates)
                            ? this.affiliateDetailWidgetService.view(id)
                            : of({ id } as any)
                    );
                }),
                catchError((error) => {
                    this.router.navigate([this.navigationPath.affiliates.root]);
                    return throwError(error);
                }),
                tap((affiliate) => {
                    this.affiliate.emit(affiliate);
                })
            )
        )
    );

    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly router: Router,
        private readonly profileQuery: ProfileQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly affiliateDetailWidgetService: AffiliateDetailWidgetService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(NAVIGATION_PATH_TOKEN) public readonly navigationPath: ManagerPathResolverType
    ) {}

    editModal() {
        const modal$ = this.modal3Service.editForm(AffiliateCreateComponent, {
            data: {
                editId: this._affiliateId$.value
            }
        });

        modal$.afterClosed$.pipe(takeUntil(this.unsubscribe)).subscribe(({ type }) => {
            if (type === Modal3CloseEventEnum.Delete) {
                console.log(this.navigationPath.affiliates.root);
                // this.router.navigate([this.navigationPath.affiliates.root]);
            } else {
                this._update$.next();
                this.changed.emit();
            }
        });
    }

    billingPreferencesWasChanged() {
        this.changed.emit();
    }

    affiliateSettingsWasChanged() {
        this._update$.next();
    }
}
