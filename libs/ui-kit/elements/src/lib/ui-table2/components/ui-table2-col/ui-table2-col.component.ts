import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'ui-table2-col',
    templateUrl: './ui-table2-col.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2ColComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() value: any;

    @Input() className: string;

    @Input() inlineStyle: { [key: string]: any };

    @Input() innerClassName: string;

    @Input() colspan: number;

    @ViewChild('containerRef', { static: true, read: ElementRef }) containerRef: ElementRef;

    @ViewChild('valueContainerRef', { static: true, read: ElementRef }) valueContainerRef: ElementRef;

    @ContentChild('') content: ElementRef;

    get container(): any {
        return this.containerRef.nativeElement;
    }
}
