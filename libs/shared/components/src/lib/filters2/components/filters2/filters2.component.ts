import { AfterViewInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SingleFilterComponent } from '../single-filter/single-filter.component';

@Component({
    selector: 'app-filters2',
    templateUrl: './filters2.component.html',
    styleUrls: ['./filters2.component.css']
})
export class Filters2Component implements AfterViewInit {
    @Input() formGroup: FormGroup;

    @ContentChildren(SingleFilterComponent) children: QueryList<SingleFilterComponent>;

    @ContentChildren(TemplateRef) children2: TemplateRef<any>;

    ngAfterViewInit(): void {
        this.children.forEach((comp) => {
            console.log(comp);
        });
    }
}
