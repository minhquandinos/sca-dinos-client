import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OfferCreativeInterface, OfferUrlsInterface } from '@scaleo/offer/common';
import { TargetingLinkBuilderOfferConfigModel } from '@scaleo/offer/link-builder/common';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';

import { TargetingLinkBuilderFormService } from './targeting-link-builder-form.service';

@Injectable()
export class TargetingLinkBuilderDefaultService {
    id: number;

    private readonly _links$: BehaviorSubject<OfferUrlsInterface[]> = new BehaviorSubject([]);

    private readonly _staticCreatives$: BehaviorSubject<OfferCreativeInterface[]> = new BehaviorSubject([]);

    readonly staticCreatives$ = this._staticCreatives$.asObservable().pipe(
        map((items) =>
            items.map((item) => {
                const { id, title } = item;
                return { id, title };
            })
        )
    );

    constructor(private readonly formService: TargetingLinkBuilderFormService) {}

    initData(config: TargetingLinkBuilderOfferConfigModel): void {
        this.setData(config);
        this.updateOfferControl();
    }

    get getLinks$(): Observable<OfferUrlsInterface[]> {
        return this._links$.asObservable();
    }

    private setData({ links, creatives, id }: TargetingLinkBuilderOfferConfigModel): void {
        this.setLinks(links);
        this.setCreatives(creatives);
        this.id = id;
    }

    private updateOfferControl(): void {
        this.formService.form.patchValue({
            o: this.id
        });
        this.formService.form.get('o').disable();
    }

    private setLinks(value: OfferUrlsInterface[]): void {
        const links = Array.isArray(value) ? value.filter((link) => link.type !== OfferUrlsTypeIdEnum.Preview) : [];
        this._links$.next(links);
    }

    private setCreatives(value: OfferCreativeInterface[]): void {
        this._staticCreatives$.next(Array.isArray(value) ? value : []);
    }

    get formControls(): { [key: string]: any } {
        return {
            o: [undefined, Validators.required],
            link_id: [undefined, Validators.required],
            creative_id: null
        };
    }
}
