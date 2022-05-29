import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, startWith, Subject, switchMap } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { AffiliateBillingPreferencesModel, BillingPreferencesService } from '@scaleo/affiliate-billing/preferences/data-access';
import { billingPreferencesFields, BillingPreferencesFieldType } from '@scaleo/affiliate-billing/preferences/filds-view';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateAccessBillingPreferencesEditComponent } from '@scaleo/feature/affiliate/billing/preferences/edit';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-affiliate-billing-preferences',
    templateUrl: './affiliate-billing-preferences.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class AffiliateBillingPreferencesComponent implements OnInit {
    @Input() fields: BillingPreferencesFieldType[] = billingPreferencesFields();

    @Output()
    changed: EventEmitter<void> = new EventEmitter();

    private _data$: BehaviorSubject<AffiliateBillingPreferencesModel> = new BehaviorSubject<AffiliateBillingPreferencesModel>(undefined);

    readonly data$ = this._data$.asObservable();

    private _update$: Subject<void> = new Subject();

    constructor(
        private modal3Service: Modal3Service,
        private translate: TranslateService,
        private billingPreferencesService: BillingPreferencesService,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._update$
            .pipe(
                startWith(''),
                switchMap(() => this.billingPreferencesService.show()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((result) => {
                this._data$.next(result);
            });
    }

    edit() {
        const modal$ = this.modal3Service.editForm(AffiliateAccessBillingPreferencesEditComponent, {
            data: {
                data: this._data$.value
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                take(1)
            )
            .subscribe(() => {
                this._update$.next();
                this.changed.emit();
            });
    }
}
