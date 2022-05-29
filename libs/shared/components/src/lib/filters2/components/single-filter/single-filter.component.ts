import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';

import { FindAffiliatesComponent } from '@scaleo/shared/components/find';

@Component({
    selector: 'app-single-filter',
    templateUrl: './single-filter.component.html',
    styleUrls: ['./single-filter.component.css']
})
export class SingleFilterComponent implements AfterViewInit {
    @Input() dropdown = true;

    @Input() output = true;

    @ContentChild(FindAffiliatesComponent, { static: true }) content: FindAffiliatesComponent;

    ngAfterViewInit(): void {
        console.log('SingleFilterComponent', this.content);
        this.content?.toggleFull.subscribe((v) => {
            console.log('SingleFilterComponent toggleFull', v);
        });

        this.content?.initialSelected.subscribe((v) => {
            console.log('SingleFilterComponent initialSelected', v);
        });
    }
}
