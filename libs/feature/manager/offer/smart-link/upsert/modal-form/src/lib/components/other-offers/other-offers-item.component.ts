import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { OtherOffersItemModel } from './other-offers.model';

@Component({
    selector: 'app-other-offers-item',
    template: `
        <div [formGroupName]="i" class="d-flex align-items-end">
            <div class="form-crud__item w-100 m-r-8">
                <app-find-offer
                    itemLabel="title"
                    itemValue="id"
                    formName="offer_id"
                    formNameArray="other_offers"
                    [index]="i"
                    [exceptIds]="selectedOtherOffers$ | async"
                    [clearable]="i | isTruthy: 0"
                    [hideSelected]="true"
                    status="active"
                ></app-find-offer>
            </div>

            <div class="form-crud__item d-flex align-items-center ml-auto mb-1">
                <ui-svg-icon *ngIf="i" icon="delete" (click)="delete(i)" tooltip="{{ 'tooltip.basic.delete' | translate }}"></ui-svg-icon>
            </div>
        </div>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OtherOffersItemComponent implements OnInit {
    @Input() i: number;

    public selectedOtherOffers$: Observable<number[]>;

    constructor(private parentForm: FormGroupDirective) {}

    public ngOnInit(): void {
        this.selectedOtherOffers$ = this.getSelectedOtherOffers$();
    }

    private get getOtherOffersFormArray(): FormArray {
        return this.parentForm.form.get('other_offers') as FormArray;
    }

    private get getCurrentOfferSelectValue(): number {
        return (this.getOtherOffersFormArray.value[this.i] as OtherOffersItemModel)?.offer_id;
    }

    public delete(index: number) {
        this.getOtherOffersFormArray.removeAt(index);
    }

    private getSelectedOtherOffers$(): Observable<number[]> {
        return this.parentForm.form.get('other_offers').valueChanges.pipe(
            startWith(this.getOtherOffersFormArray.value as OtherOffersItemModel[]),
            map((value: OtherOffersItemModel[]) => {
                if (value) {
                    return value
                        .map((item) => item.offer_id)
                        .filter((offerId) => offerId)
                        .filter((offerId) => offerId !== this.getCurrentOfferSelectValue);
                }
                return [];
            })
        );
    }
}
