import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appConfigTableColumn2ItemTooltip]'
})
export class ConfigTableColumn2ItemTooltipDirective {
    @Input() key: string;

    constructor() {}
}
