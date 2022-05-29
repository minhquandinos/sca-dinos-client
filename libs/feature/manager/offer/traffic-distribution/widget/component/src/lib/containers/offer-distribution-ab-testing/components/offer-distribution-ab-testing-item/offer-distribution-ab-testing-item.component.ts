import { Component, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BehaviorSubject, defer } from 'rxjs';
import { distinctUntilChanged, first, startWith, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import {
    OfferTrafficDistributionABTestingModel,
    OfferTrafficDistributionAbTestingService,
    OfferTrafficDistributionQuery,
    OfferTrafficDistributionService
} from '@scaleo/feature/manager/offer/traffic-distribution/widget/data-access';
import { ShortOfferLandingPageModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

import { OfferTrafficDistributionComponent } from '../../../../offer-traffic-distribution.component';
import { distributionAsyncValidation } from '../../validators/offer-distribution-sum.validation';

@Component({
    selector: 'app-offer-distribution-ab-testing-item',
    templateUrl: './offer-distribution-ab-testing-item.component.html',
    providers: [UnsubscribeService],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OfferDistributionAbTestingItemComponent implements OnInit, OnDestroy, OnChanges {
    @Input() item: OfferTrafficDistributionABTestingModel;

    @Input() index: number;

    @Input() landings: ShortOfferLandingPageModel[];

    @Input() selectedLandings: number[];

    showDeleteBtn = false;

    disabledControl = false;

    private _showSaveBtn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly showSaveBtn$ = this._showSaveBtn$.asObservable();

    constructor(
        private readonly unsubscribe: UnsubscribeService,
        private readonly offerTrafficDistributionService: OfferTrafficDistributionService,
        private readonly abTestingService: OfferTrafficDistributionAbTestingService,
        private readonly offerTrafficDistributionComponent: OfferTrafficDistributionComponent,
        private readonly distributionQuery: OfferTrafficDistributionQuery,
        @Optional() private readonly parentForm: FormGroupDirective,
        private readonly fb: FormBuilder,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {}

    ngOnInit(): void {
        this.addControl();
        this.setShowDeleteBtn();
        this.setDisabledControl();
        this.control.valueChanges.pipe(startWith(''), distinctUntilChanged(), takeUntil(this.unsubscribe)).subscribe((value) => {
            if (!this.item?.landing?.is_default) {
                if (!!value?.landing_page && !!value?.distribution) {
                    this._showSaveBtn$.next(true);
                }
            }
        });
    }

    ngOnDestroy() {
        this.deletedControl();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { item } = changes;

        if (!item?.isFirstChange() && item?.currentValue) {
            this.updateControl();
        }
    }

    save() {
        if (this.control.valid) {
            this.upsert();
            this._showSaveBtn$.next(false);
        } else {
            console.log('not valid');
            this.control.markAllAsTouched();
        }
    }

    delete() {
        this.abTestingService.delete(this.offerDetailQuery.id, this.item.id).pipe(first()).subscribe();
    }

    get currentLanding(): number {
        return this.control?.get('landing_page').value;
    }

    private get controlItems(): FormArray {
        return this.parentForm.form.get('items') as FormArray;
    }

    private get control(): AbstractControl {
        return this.controlItems?.controls[this.index];
    }

    private setShowDeleteBtn(): void {
        this.showDeleteBtn = !this.landingDefaultType;
    }

    private setDisabledControl(): void {
        this.disabledControl = this.landingDefaultType;
    }

    private get landingDefaultType(): boolean {
        return Util.numToBoolean(this.item?.landing?.is_default);
    }

    private get distributionValue(): number {
        return +this.control.get('distribution').value;
    }

    private upsert() {
        defer(() => (typeof this.item.id === 'string' ? this.create$ : this.update$))
            .pipe(
                first(),
                tap(() => {
                    this.offerTrafficDistributionComponent.reloadLandingPage();
                })
            )
            .subscribe();
    }

    private get create$() {
        return this.abTestingService.create(this.offerDetailQuery.id, this.item.id as string, this.currentLanding, this.distributionValue);
    }

    private get update$() {
        return this.abTestingService.update(this.offerDetailQuery.id, this.item.id as number, this.distributionValue);
    }

    private addControl() {
        (this.parentForm.form.get('items') as FormArray).push(
            this.fb.group({
                landing_page: [this.item?.landing?.id ?? null, Validators.required],
                distribution: [
                    this.item?.distribution ?? 0,
                    [Validators.required, Validators.max(100)],
                    [distributionAsyncValidation(this.distributionQuery)]
                ]
            })
        );
    }

    private updateControl() {
        this.control.patchValue(
            {
                landing_page: this.item?.landing?.id,
                distribution: this.item?.distribution
            },
            { emitEvent: false, onlySelf: false }
        );
    }

    private deletedControl(): void {
        this.controlItems?.removeAt(this.index);
        this.controlItems?.updateValueAndValidity();
    }
}
