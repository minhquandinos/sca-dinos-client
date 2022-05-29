import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';

import { BaseFind4Component } from '../../base-find4.component';
import { FindSmartLinkService } from './find-smart-link.service';

@DynamicComponentLookup('FindSmartLinkComponent')
@Component({
    selector: 'app-find-smart-link',
    template: ` <app-select
        [items]="items$ | async"
        [loading]="loading"
        [label]="label"
        [itemLabel]="itemLabel"
        [itemValue]="itemValue"
        [labelShowId]="labelShowId"
        [searchable]="true"
        [multiple]="multiple"
        [searchFn]="customSearchFn"
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
    ></app-select>`,
    providers: [FindSmartLinkService],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindSmartLinkComponent extends BaseFind4Component<ShortResponseInterface> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    constructor(protected translate: TranslateService, protected parentF: FormGroupDirective, protected service: FindSmartLinkService) {
        super(parentF, translate, service);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    customSearchFn(): boolean {
        return true;
    }
}
