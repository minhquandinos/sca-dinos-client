import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';

import { UnitsType } from '@scaleo/core/data';

interface DropdownEntitySizeType {
    size: number;
    units: UnitsType;
}

// TODO refactor css style for this component
@Component({
    selector: 'ui-dropdown-entity',
    templateUrl: './dropdown-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownEntityComponent {
    @Input() scrollDisabled = false;

    @Input() set width({ size, units }: DropdownEntitySizeType) {
        if (size) {
            this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'width', `${size}${units}`);
            if (size < 160) {
                this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'min-width', 'auto');
            }
        } else {
            this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'width', `auto`);
        }
    }

    @Input() set height({ size, units }: DropdownEntitySizeType) {
        if (size) {
            this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'height', `${size}${units}`);
        } else {
            this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'height', `auto`);
        }
    }

    @Input() className = '';

    @Input() xPlacement: 'bottom-end' = 'bottom-end';

    @Input() rightDropdownMenu: boolean;

    @Input() set searchBox(value: boolean) {
        if (value) {
            this.renderer.addClass(this.dropdownContentRef.nativeElement, 'dropdown-menu--search-box');
        }
    }

    @Input() extraLeftPadding = 0;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    show = false;

    @ViewChild('dropdownRef', { static: true }) dropdownRef: ElementRef;

    @ViewChild('dropdownContentRef', { static: true }) dropdownContentRef: ElementRef;

    @HostListener('document:click', ['$event'])
    hideDropdown(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target) && this.show) {
            this.close();
        }
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) private document: HTMLDocument) {}

    open() {
        this.show = !this.show;
        this.toggle.emit(this.show);
        this.calcDropPosition();
    }

    close() {
        this.show = false;
        this.toggle.emit(this.show);
    }

    public calcDropPosition() {
        if (!this.rightDropdownMenu) {
            setTimeout(() => {
                const btnWidth = this.dropdownRef.nativeElement.offsetWidth;
                const dropWidth = this.dropdownContentRef.nativeElement.clientWidth;
                const position = this.elementRef.nativeElement.offsetLeft;
                const pageContentEl = this.document.querySelector('.page-content') || this.document.querySelector('body');
                const { clientWidth } = pageContentEl;

                if (dropWidth + position >= clientWidth) {
                    this.renderer.setStyle(
                        this.dropdownContentRef.nativeElement,
                        'left',
                        `-${dropWidth - btnWidth + this.extraLeftPadding}px`
                    );
                } else {
                    this.renderer.setStyle(this.dropdownContentRef.nativeElement, 'left', `0px`);
                }
            }, 0);
        }
    }
}
