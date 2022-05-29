import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

import { BaseIdTitleModel, BaseObjectModel } from '@scaleo/core/data';
import { OfferTargetingService } from '@scaleo/feature/manager/offer/targeting/data-access';
import { CustomParamsConditionsIdEnum, CustomParamsTypesIdEnum } from '@scaleo/platform/list/access-data';
import { GeoIpService } from '@scaleo/shared/data-access';

@Component({
    selector: 'app-condition-row',
    templateUrl: './condition-row.component.html'
})
export class ConditionRowComponent implements OnInit {
    @Input() group: FormGroup;

    @Input() index: number;

    @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

    conditions$: Observable<any[]>;

    readonly customParamsConditionsIdEnum = CustomParamsConditionsIdEnum;

    conditionType$: Observable<CustomParamsConditionsIdEnum>;

    private readonly conditionSearchSubject$ = new BehaviorSubject<string>('');

    constructor(private offerTargetingService: OfferTargetingService, private geoIpService: GeoIpService) {}

    ngOnInit(): void {
        this.conditions$ = this.conditionSearchSubject$.pipe(
            debounceTime(200),
            switchMap((search) => this.changeConditionsData(search))
        );

        this.conditionType$ = this.getConditionType$;
    }

    changeCondition(): void {
        this.group.get('conditions').reset();
        this.group.get('permission').setValue(CustomParamsTypesIdEnum.Include);

        this.conditionSearchSubject$.next('');
    }

    delete(): void {
        this.deleted.emit();
    }

    searching(search: string): void {
        this.conditionSearchSubject$.next(search);
    }

    private changeConditionsData(search: string): Observable<any[]> {
        const { type } = this.group.value;

        const conditionSearchFuncMap: BaseObjectModel = {
            [CustomParamsConditionsIdEnum.Geo]: (): any => this.searchGeoNames(search),
            [CustomParamsConditionsIdEnum.MobileOperator]: (): any => this.offerTargetingService.mobileOperators(search),
            [CustomParamsConditionsIdEnum.DeviceOS]: (): any => this.offerTargetingService.operatingSystems(search),
            [CustomParamsConditionsIdEnum.DeviceBrand]: (): any => this.offerTargetingService.brands(search),
            [CustomParamsConditionsIdEnum.DeviceModel]: (): any => this.offerTargetingService.models(search),
            [CustomParamsConditionsIdEnum.Browser]: (): any => this.offerTargetingService.browsers(search),
            [CustomParamsConditionsIdEnum.Language]: (): any => this.offerTargetingService.language(search)
        };

        const searchFuncByType = conditionSearchFuncMap[type];

        return searchFuncByType ? searchFuncByType() : EMPTY;
    }

    private searchGeoNames(search: string): Observable<BaseIdTitleModel[]> {
        return this.geoIpService.getGeoNames(search).pipe(
            map((geo) =>
                geo.map((item) => {
                    let countryRegion = '';
                    if (item.region_title) {
                        if (item.title === item.region_title) {
                            const region = item.region_title.split(' ').length === 1 ? `${item.region_title}, ` : '';
                            countryRegion = `(${region}${item.country_title})`;
                        } else {
                            countryRegion = `(${item.region_title}, ${item.country_title})`;
                        }
                    } else if (item.country_title && item.title !== item.country_title) {
                        countryRegion = `(${item.country_title})`;
                    }
                    return {
                        ...item,
                        title: `${item.title} ${countryRegion}`
                    };
                })
            )
        );
    }

    private get getConditionType$(): Observable<CustomParamsConditionsIdEnum> {
        const typeControl = this.group.get('type');
        return typeControl.valueChanges.pipe(startWith(typeControl.value as CustomParamsConditionsIdEnum));
    }
}
