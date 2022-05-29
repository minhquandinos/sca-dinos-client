import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';

import { PlatformListsFormatInterface } from '../../../../../platform/list/access-data/src/lib/models/platform.lists.interface';
import { AbstractDropdownComponent } from '../../../../../ui-kit/elements/src/lib/old/dropdown/abstract-dropdown.component';

@Component({
    selector: 'app-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent extends AbstractDropdownComponent implements OnInit, OnChanges {
    @Input() elements: PlatformListsFormatInterface[] = [];

    @Input() selected: string | number;

    @Input() className: string;

    @Input() title: string;

    @Input() returnValue: 'id' | 'title' | 'value' = 'title';

    @Input() lowerCase = true;

    @Input() paramForSearchInObject = 'title';

    @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

    public selectedElement: string;

    constructor(protected renderer: Renderer2) {
        super(renderer);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { selected } = changes;
        if (selected && selected.currentValue) {
            this.selectedElement = selected.currentValue;
        }
        this.initDetectedElement();
    }

    public setElement(element: PlatformListsFormatInterface) {
        this.selectedElement = element.title;

        if (this.returnValue === 'title') {
            this.toggle.emit(element[this.returnValue].toLowerCase());
        } else {
            this.toggle.emit(element[this.returnValue]);
        }
    }

    private initDetectedElement() {
        let selectedElement = null;
        if (this.elements && this.selectedElement) {
            selectedElement = this.elements.find(
                (obj) => String(this.selectedElement).toLowerCase() === obj[this.paramForSearchInObject].toLowerCase()
            );
        }
        this.selectedElement = selectedElement ? selectedElement.title : this.elements ? this.elements[0].title : null;
    }
}
