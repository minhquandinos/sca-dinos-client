import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-detail-flex-layout',
    template: `
        <div fxLayout="row" fxLayout.md="column" fxFlexFill fxLayoutGap="1rem">
            <div fxFlex="400px" fxFlex.md="100" fxFlex.xxl="500px">
                <div appSticky="bottomTop">
                    <ng-content name="[leftSide]"></ng-content>
                </div>
            </div>

            <div fxFlex fxLayoutGap="1rem" fxLayout="column">
                <ng-content name="[rightSide]"></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailFlexLayoutComponent {}
