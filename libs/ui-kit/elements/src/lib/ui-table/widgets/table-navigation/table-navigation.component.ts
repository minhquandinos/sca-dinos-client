import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { debounceTime, startWith, take } from 'rxjs/operators';

import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { TableNavigationDropdownDirective } from './table-navigation-dropdown.directive';

@Component({
    selector: 'ui-table-navigation',
    templateUrl: './table-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, ResizeObserverService]
})
export class TableNavigationComponent implements AfterContentInit {
    // @Input() tableElement: ElementRef;
    @Input() action = 'edit';

    @Output() toggleEdit: EventEmitter<void> = new EventEmitter<void>();

    childMenu: boolean;

    // @ContentChild(UiButtonLinkComponent)
    // private uiButtonLinkComponent: UiButtonLinkComponent;

    @ViewChild('actionsRef', { static: true })
    readonly actionsRef: ElementRef;

    @ViewChild('buttonGroupRef', { static: true })
    readonly buttonGroupRef: ElementRef;

    @ContentChild(TableNavigationDropdownDirective)
    readonly tableNavigationDropdown: TableNavigationDropdownDirective;

    constructor(private readonly renderer2: Renderer2, private readonly resizeObserverService: ResizeObserverService) {}

    ngAfterContentInit(): void {
        this.resizeObserverService
            .observe(this.actionsRef.nativeElement)
            .pipe(startWith(this.actionsRef.nativeElement), debounceTime(0), take(1))
            .subscribe(() => {
                const nodes = ([...this.actionsRef.nativeElement.childNodes] as HTMLElement[]).filter((node) => {
                    return !!node?.innerHTML?.trim();
                });
                if (nodes.length >= 2) {
                    const t = nodes.length * 50;
                    this.renderer2.setStyle(this.buttonGroupRef.nativeElement, 'left', `-${t}%`);
                    this.renderer2.setStyle(this.buttonGroupRef.nativeElement, 'transform', `translate(-${t}, -50%)`);
                }
            });
    }

    edit() {
        this.toggleEdit.emit();
    }
}
