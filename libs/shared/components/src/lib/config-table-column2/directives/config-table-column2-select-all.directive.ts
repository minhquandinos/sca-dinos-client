import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

import { ConfigTableColumn2Service } from '../config-table-column2.service';
import { ConfigTableColumn2Model } from '../models/config-table-column2.model';

@Directive({
    selector: '[appConfigTableColumn2SelectAll]'
})
export class ConfigTableColumn2SelectAllDirective implements OnInit {
    @Input('appConfigTableColumn2SelectAll') items: ConfigTableColumn2Model[] = [];

    @HostListener('click', ['$event'])
    click() {
        this.checkAllItemsInGroup();
    }

    constructor(private host: ElementRef, private configTableColumn2Service: ConfigTableColumn2Service, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.renderer.addClass(this.host.nativeElement, 'cursor-pointer');
    }

    private checkAllItemsInGroup(): void {
        this.configTableColumn2Service.checkAllColumnsInGroup(this.items);
    }
}
