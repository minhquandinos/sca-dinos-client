import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, pluck, switchMap } from 'rxjs/operators';

import { OfferTargetingRulesEnum, OfferTargetingService } from '@scaleo/feature/manager/offer/targeting/data-access';
import { PlatformListsFormatInterface, PlatformListsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-extended-targeting-item',
    templateUrl: './extended-targeting-item.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: ExtendedTargetingItemComponent
        }
    ]
})
export class ExtendedTargetingItemComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() group: FormGroup;

    @Input() index: number;

    @Output() remove: EventEmitter<number> = new EventEmitter<number>();

    public platformLists$: Observable<PlatformListsInterface> = this.platformListsService.platformListsNew('connection_types,device_types');

    public permissions: PlatformListsFormatInterface[] = [
        { id: 1, title: 'Allow' },
        { id: 2, title: 'Deny' }
    ];

    public conditions: Observable<any[]>;

    public conditionsSearch: boolean;

    public conditionsSubject: Subject<string> = new Subject<string>();

    public offersTargetingRulesEnum = OfferTargetingRulesEnum;

    public targetingType: number;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private offerTargetingService: OfferTargetingService, private platformListsService: PlatformListsService) {}

    ngOnInit(): void {
        this.conditions = this.conditionsSubject.pipe(
            debounceTime(200),
            switchMap((search) => this.changeConditionsData(search))
        );
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.group.get('type').value) {
                this.targetingType = this.group.get('type').value;
                this.conditionsSubject.next('');
            }
        }, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    deleteRule() {
        this.remove.emit(this.index);
    }

    changeType(event: any) {
        if (event && event.newValue) {
            this.targetingType = event.newValue;
            this.conditionsSearch = false;
            this.group.get('conditions').reset();

            Promise.resolve().then(() => {
                this.conditionsSubject.next('');
            });
        }
    }

    searching(search: string) {
        this.conditionsSubject.next(search);
    }

    private changeConditionsData(search: string): Observable<any[]> {
        switch (this.targetingType) {
            case OfferTargetingRulesEnum.ConnectionType:
                return this.platformLists$.pipe(pluck('connection_types'));
            case OfferTargetingRulesEnum.MobileOperator:
                this.conditionsSearch = true;
                return this.offerTargetingService.mobileOperators(search);
            case OfferTargetingRulesEnum.DeviceType:
                return this.platformLists$.pipe(pluck('device_types'));
            case OfferTargetingRulesEnum.DeviceOS:
                this.conditionsSearch = true;
                return this.offerTargetingService.operatingSystems(search);
            case OfferTargetingRulesEnum.DeviceBrand:
                this.conditionsSearch = true;
                return this.offerTargetingService.brands(search);
            case OfferTargetingRulesEnum.DeviceModel:
                this.conditionsSearch = true;
                return this.offerTargetingService.models(search);
            case OfferTargetingRulesEnum.Browser:
                this.conditionsSearch = true;
                return this.offerTargetingService.browsers(search);
            case OfferTargetingRulesEnum.Language:
                this.conditionsSearch = true;
                return this.offerTargetingService.language(search);
            case OfferTargetingRulesEnum.DeviceOSVersion:
            default:
                return of(null);
        }
    }
}
