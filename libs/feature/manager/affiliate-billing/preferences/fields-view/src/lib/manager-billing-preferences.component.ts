import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, startWith, Subject, switchMap } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { AffiliateBillingPreferencesModel, BillingPreferencesService } from '@scaleo/affiliate-billing/preferences/data-access';
import { billingPreferencesFields, BillingPreferencesFieldType } from '@scaleo/affiliate-billing/preferences/filds-view';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ManagerAffiliateBillingPreferencesEditComponent } from '@scaleo/feature/manager/affiliate-billing/preferences/edit';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-manager-affiliate-billing-preferences',
    templateUrl: './manager-billing-preferences.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class ManagerBillingPreferencesComponent implements OnInit {
    @Input() id: number;

    @Input() fields: BillingPreferencesFieldType[] = billingPreferencesFields();

    @Output()
    changed: EventEmitter<void> = new EventEmitter();

    private _data$: BehaviorSubject<AffiliateBillingPreferencesModel> = new BehaviorSubject<AffiliateBillingPreferencesModel>(undefined);

    readonly data$ = this._data$.asObservable();

    private _update$: Subject<void> = new Subject<void>();

    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly translate: TranslateService,
        private readonly billingPreferencesService: BillingPreferencesService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this._update$
            .pipe(
                startWith(''),
                switchMap(() => this.billingPreferencesService.show(this.id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe((result) => {
                this._data$.next(result);
            });
    }

    edit() {
        const modal$ = this.modal3Service.editForm(ManagerAffiliateBillingPreferencesEditComponent, {
            data: {
                id: this.id,
                data: this._data$.value
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                take(1)
            )
            .subscribe(() => {
                this.changed.emit();
                this._update$.next();
            });
    }
}
