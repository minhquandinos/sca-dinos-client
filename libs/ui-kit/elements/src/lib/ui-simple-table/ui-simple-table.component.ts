import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    Renderer2,
    TemplateRef
} from '@angular/core';

import {
    UiSimpleTableColTplDirective,
    UiSimpleTableColType,
    UiSimpleTableColWidth,
    UiSimpleTableConfigModel,
    UiSimpleTableHeaderModel,
    UiSimpleTableRowComponent
} from '.';

// TODO
// 1. add interface for header
// 2. refactor skeleton
// 3. ...

const CLASS_NAME = 'ui-simple-table';

@Component({
    selector: 'ui-simple-table',
    templateUrl: './ui-simple-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSimpleTableComponent implements AfterContentChecked {
    @HostBinding('class')
    readonly hostClass = `${CLASS_NAME} overflow-x-auto d-block`;

    @Input() set tableStyle(value: 'clear') {
        if (value) {
            this.renderer.addClass(this.host.nativeElement, `${CLASS_NAME}--clear`);
        } else {
            this.renderer.removeClass(this.host.nativeElement, `${CLASS_NAME}--clear`);
        }
    }

    @Input() isLoad = true;

    @Input() notFound = false;

    @Input() skeletonRowCount = 4;

    @Input() skeletonColCount = 4;

    @Input() colHeight: string;

    @Input() headers: UiSimpleTableHeaderModel[];

    @Input() headersHidden = false;

    @Input() items: any[];

    @Input()
    set tableConfig(config: UiSimpleTableConfigModel) {
        const { properties = undefined } = config?.style || {};
        if (properties) {
            const element = this.host.nativeElement;
            for (const key in properties) {
                element.style.setProperty(`--uiSimpleTable__${key}`, (properties as any)[key]);
            }
        }
    }

    @Input() controlTemplate: TemplateRef<any>;

    @ContentChildren(UiSimpleTableRowComponent)
    readonly uiSimpleTableRowComponents: QueryList<UiSimpleTableRowComponent>;

    @ContentChildren(UiSimpleTableColTplDirective)
    readonly uiSimpleTableColTplDirectives: QueryList<UiSimpleTableColTplDirective>;

    columnTemplatesMap: {
        [key: string]: {
            tpl: TemplateRef<any>;
            align: UiSimpleTableColType;
            width: UiSimpleTableColWidth;
        };
    } = {};

    constructor(private host: ElementRef, private renderer: Renderer2) {}

    trackBySkeletonFn(index: number): number {
        return index;
    }

    ngAfterContentChecked() {
        if (this.colHeight) {
            this.uiSimpleTableRowComponents.forEach((row) => {
                row.childComponents.forEach((col) => {
                    col.colHeight = this.colHeight;
                });
            });
        }

        if (this.items) {
            this.uiSimpleTableColTplDirectives.forEach((elem) => {
                this.columnTemplatesMap[elem.key] = {
                    tpl: elem.hostTpl,
                    align: elem.align,
                    width: elem?.width
                };
            });
        }
    }
}
