import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';

import { UiButtonLinkComponent } from '../ui-button-link/ui-button-link.component';

@Component({
    selector: 'ui-button-group',
    templateUrl: './ui-button-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonGroupComponent implements OnInit {
    @Input() className: string;

    @Input() shadow: boolean;

    @ViewChildren(UiButtonLinkComponent)
    buttons: QueryList<UiButtonLinkComponent>;

    @ViewChild('containerRef', { static: true }) containerRef: ElementRef;

    constructor(private renderer2: Renderer2) {}

    ngOnInit(): void {
        if (this.shadow) {
            this.renderer2.addClass(this.containerRef.nativeElement, 'btn-group--shadow');
        }
    }
}
