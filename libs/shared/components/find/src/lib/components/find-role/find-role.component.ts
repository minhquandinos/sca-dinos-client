import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, shareReplay } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { BaseFind3Component } from '@scaleo/shared/components/find';
import { ShortEntityListService, ShortEntityNameEnum, ShortRoleModel } from '@scaleo/shared/data-access/short-entity-list';

import { FindRoleFirstElementTranslatePipe } from './pipes/find-role-first-element-translate.pipe';

@Component({
    selector: 'app-find-role',
    template: `
        <app-select
            [items]="items$ | async"
            [loading]="loading"
            [label]="label"
            [itemLabel]="itemLabel"
            [itemValue]="itemValue"
            [labelShowId]="false"
            [searchable]="false"
            [multiple]="multiple"
            (search)="findElement($event)"
            (clear)="cleared()"
            [formControlName]="formName"
            (change)="selected($event)"
            (changeFull)="selectedFull($event)"
            (initialSelected)="initialSelectedHandler($event)"
            [hideDropdownArrow]="hideDropdownArrow"
            [hideSelected]="hideSelected"
            [placeholder]="placeholder$ | async"
            (scrolledToEnd)="scrolledToEnd()"
        ></app-select>
    `,
    styleUrls: ['./find-role.component.scss'],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [FindRoleFirstElementTranslatePipe]
})
export class FindRoleComponent extends BaseFind3Component<ShortRoleModel> implements OnInit, AfterViewInit, OnChanges {
    @Input() itemLabel = 'label';

    @Input() itemValue = 'role';

    @Input() hideSelected = false;

    @Input() clearable = false;

    @Input() status: string;

    @Input() roleType: ShortEntityNameEnum.Role | ShortEntityNameEnum.BaseRole = ShortEntityNameEnum.Role;

    @Input() firstElement: { role: DefaultRoleEnum | ''; label: string };

    constructor(
        private readonly shortEntityListService: ShortEntityListService,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        const { firstElement } = changes;
        if (firstElement?.currentValue) {
            this.updateStream$.next();
        }
    }

    fetch(): Observable<ShortRoleModel[]> {
        this.startFetch();
        return combineLatest([this.shortEntityListService.list(this.roleType as any), this.updateStream$.pipe(startWith(''))]).pipe(
            map(([list]) => list),
            this.appendFirstElementOperator(),
            tap(() => {
                this.endFetch();
            }) as any,
            shareReplay()
        );
    }
}
