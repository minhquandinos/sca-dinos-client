import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ui-tab-body, [uiTabBody]',
    template: ` <ng-template><ng-content></ng-content></ng-template> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTabBodyComponent implements OnInit {
    @ViewChild(TemplateRef, { static: true })
    bodyContent: TemplateRef<any>;

    ngOnInit(): void {
        console.log(this.bodyContent);
    }
}
