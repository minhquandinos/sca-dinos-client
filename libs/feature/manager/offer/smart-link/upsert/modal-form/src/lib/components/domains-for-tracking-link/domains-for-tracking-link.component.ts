import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { DomainsForTrackingLinkService } from './domains-for-tracking-link.service';

@Component({
    selector: 'app-domains-for-tracking-link',
    template: `
        <app-select
            [items]="trackingDomains$ | async"
            [label]="'table.column.tracking_domain' | translate"
            itemLabel="title"
            itemValue="id"
            [formControlName]="formName"
            [placeholder]="'interface.basic.select' | translate"
        ></app-select>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class DomainsForTrackingLinkComponent {
    @Input() formName: string;

    public readonly trackingDomains$ = this.service.getList$.pipe(
        tap((domains) => {
            if (domains && !this.parentForm.form.getRawValue()[this.formName]) {
                this.parentForm.form.patchValue({
                    [this.formName]: domains.find((domain) => domain.sort === 1).id
                });
            }
        })
    );

    constructor(private service: DomainsForTrackingLinkService, private parentForm: FormGroupDirective) {}
}
