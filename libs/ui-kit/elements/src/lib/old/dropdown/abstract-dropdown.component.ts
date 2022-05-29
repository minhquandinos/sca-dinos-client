import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({ template: '' })
export abstract class AbstractDropdownComponent<T = any> implements OnInit {
    @Input() dropPosition: 'left' | 'right' | 'up';
    @Input() dropMenuPosition: 'right';

    @ViewChild('dropdownRef', { static: true })
    dropdownRef: ElementRef;

    @ViewChild('dropdownMenuRef', { static: true })
    dropdownMenuRef: ElementRef;

    protected constructor(protected renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.dropPosition) {
            this.renderer.addClass(this.dropdownRef.nativeElement, `drop${this.dropPosition}`);
        }

        if (this.dropMenuPosition) {
            this.renderer.addClass(this.dropdownMenuRef.nativeElement, `dropdown-menu-${this.dropMenuPosition}`);
        }
    }
}
