import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';

import { BaseFind4Component } from '../../base-find4.component';
import { FindOperatingSystemsService } from './find-operating-systems.service';

@DynamicComponentLookup('FindOperatingSystemsComponent')
@Component({
    selector: 'app-find-operating-systems',
    template: `
        <app-select
            [items]="items$ | async"
            [loading]="loading"
            [label]="label"
            [itemLabel]="itemLabel"
            [itemValue]="itemValue"
            [labelShowId]="labelShowId"
            [searchable]="true"
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
    providers: [FindOperatingSystemsService],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindOperatingSystemsComponent extends BaseFind4Component<ShortResponseInterface> implements OnInit, AfterViewInit {
    @Input() override itemLabel = 'title';

    @Input() override itemValue = 'id';

    @Input() override labelShowId = false;

    constructor(
        protected override translate: TranslateService,
        protected override parentF: FormGroupDirective,
        protected override service: FindOperatingSystemsService
    ) {
        super(parentF, translate, service);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.items$ = this.fetch();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }
}
