import { Directive } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout';

const inputs = ['fxFlex.xxl'];

@Directive({
    selector:
        // eslint-disable-next-line @angular-eslint/directive-selector
        '[fxFlex.xxl]',
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs
})
export class CustomFlexDirective extends FlexDirective {
    protected inputs = inputs;
}
