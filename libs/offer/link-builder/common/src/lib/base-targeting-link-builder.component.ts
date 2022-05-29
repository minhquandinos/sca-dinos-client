import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { delay, filter, map, pluck, startWith, switchMap, tap } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { LinkGenerator } from '@scaleo/offer/link-builder/common';
import { FindAffiliatesComponent } from '@scaleo/shared/components/find';
import { ShortAffiliateModel } from '@scaleo/shared/data-access/short-entity-list';
import { Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';

import { TargetingLinkBuilderEnum } from './enums/targeting-link-builder.enum';
import { TargetingLinkBuilderInputDataModel } from './models/targeting-link-builder.model';
import { TargetingLinkBuilderType } from './types/targeting-link-builder.type';

@Component({
    template: ''
})
export abstract class BaseTargetingLinkBuilderComponent implements OnInit {
    readonly trackingDomain: string;

    readonly haveDeepLink: boolean;

    readonly config: TargetingLinkBuilderType;

    readonly affiliateId: number = null;

    readonly isAffiliateAccess: boolean = false;

    form: FormGroup;

    showSubId = false;

    trackingLink$: Observable<string>;

    impressionsPixelsLink$: Observable<string>;

    showAffiliateClickId = false;

    showMobileParams = false;

    showDeepLink = false;

    public displayImpressionPixel = false;

    private _builderType$: BehaviorSubject<TargetingLinkBuilderEnum> = new BehaviorSubject<TargetingLinkBuilderEnum>(null);

    readonly builderType$ = this._builderType$.asObservable();

    private _defaultLinkId$ = new BehaviorSubject<number>(undefined);

    trackingTitle$: Observable<string>;

    @ViewChild(FindAffiliatesComponent)
    set findAffiliatesComponent(value: FindAffiliatesComponent) {
        if (value && !this.getAffiliateFormValue) {
            this.findAffiliatesComponent$.next(value);
        }
    }

    readonly findAffiliatesComponent$ = new BehaviorSubject<FindAffiliatesComponent>(null);

    protected constructor(
        protected readonly modal3Ref: Modal3EditFormRef<any, TargetingLinkBuilderInputDataModel>,
        protected translate: TranslateService
    ) {
        const { trackingDomain, haveDeepLink, config } = this.modal3Ref.config.data;
        this.trackingDomain = trackingDomain;
        this.haveDeepLink = haveDeepLink;
        this.config = config;
        this.affiliateId = this.config?.affiliateId;
        this.isAffiliateAccess = this.config?.isAffiliateAccess;
    }

    ngOnInit(): void {
        if (typeof this.config === 'object') {
            this.setBuilderType(this.config.type);
        }
        this.trackingTitle$ = this.trackingTitle(this.isAffiliateAccess);
    }

    get defaultLinkId(): number {
        return this._defaultLinkId$.value;
    }

    set defaultLinkId(id: number) {
        this._defaultLinkId$.next(id);
    }

    get getAffiliateFormValue(): number {
        return this.form.get('a').value;
    }

    customSearchFn(term: string, item: ShortResponseInterface) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term;
    }

    changeShowSource(item: string, nameFormControl?: string | string[]) {
        let checkBool: boolean;
        if (!nameFormControl) {
            nameFormControl = item;
        }
        switch (item) {
            case 'aff_click_id':
                this.showAffiliateClickId = !this.showAffiliateClickId;
                checkBool = this.showAffiliateClickId;
                break;
            case 'deep_link':
                this.showDeepLink = !this.showDeepLink;
                checkBool = this.showDeepLink;
                break;
            case 'mobileParams':
                this.showMobileParams = !this.showMobileParams;
                checkBool = this.showMobileParams;
                break;
            case 'sub_ids':
                this.showSubId = !this.showSubId;
                checkBool = this.showSubId;
                break;
            default:
                checkBool = false;
                break;
        }

        if (!checkBool) {
            if (item === 'sub_ids') {
                (this.form.get('sub_ids') as FormArray).clear();
            } else {
                this.setNullForControl(nameFormControl);
            }
        }
    }

    setNullForControl(nameFormControl: string | string[]) {
        if (Array.isArray(nameFormControl)) {
            nameFormControl.forEach((item) => this.form.get(item).setValue(null));
        } else {
            this.form.get(nameFormControl).setValue(null);
        }
    }

    assignValueForLinks(): void {
        this.trackingLink$ = this.getTrackingLink$;
        this.impressionsPixelsLink$ = this.getImpressionsPixelsLink$;
    }

    private setBuilderType(value: TargetingLinkBuilderEnum) {
        this._builderType$.next(value);
    }

    get builderType(): TargetingLinkBuilderEnum {
        return this._builderType$.value;
    }

    private get getTrackingLink$(): Observable<string> {
        const linksGenerator = new LinkGenerator();
        return combineLatest([this._defaultLinkId$, this.form.valueChanges.pipe(startWith(''))]).pipe(
            delay(200),
            map(([id]) => linksGenerator.generateLink(this.form, this.trackingDomain, id))
        );
    }

    private get getImpressionsPixelsLink$(): Observable<string> {
        const linksGenerator = new LinkGenerator();
        return combineLatest([this._defaultLinkId$, this.form.valueChanges.pipe(startWith(''))]).pipe(
            startWith(''),
            delay(150),
            map(([id]) => linksGenerator.generateImpressionsUrl(this.form, this.trackingDomain, id))
        );
    }

    public changeDisplayImpressionPixel() {
        this.displayImpressionPixel = !this.displayImpressionPixel;
    }

    protected setFirstAffiliateId(): Observable<ShortAffiliateModel> {
        return this.findAffiliatesComponent$.pipe(
            filter((component) => !!component),
            switchMap((component) => component.items$),
            filter((affiliates) => affiliates.length > 0),
            pluck(0),
            tap((affiliate) => {
                this.form.get('a').patchValue(+affiliate.id);
            })
        );
    }

    private trackingTitle(isAffiliate?: boolean): Observable<string> {
        const TRACKING_TRANSLATE = 'offers_page.tracking.form';
        const title = isAffiliate ? 'tracking_link_for_affiliate' : 'tracking_link';
        return this.translate.stream(`${TRACKING_TRANSLATE}.${title}`);
    }
}
