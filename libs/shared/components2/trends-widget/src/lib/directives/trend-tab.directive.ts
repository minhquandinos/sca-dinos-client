import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

import { PlatformPermissionsUnionType } from '@scaleo/platform/permission/role';

@Directive({
    selector: '[appTrendTab]',
    exportAs: 'appTrendTab'
})
export class TrendTabDirective {
    @Input() label: string;

    @ContentChild('topOfferComponent', { static: true })
    readonly topOfferComponent: TemplateRef<any>;

    constructor(public readonly hostTemplate: TemplateRef<any>) {}
}
