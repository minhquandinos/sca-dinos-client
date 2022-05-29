import { Component, HostBinding, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

import { DownloadConversionsViaCSVLinkInterface, downloadConversionsViaCSVLinks } from './download-conversions-via-csv.config';

@Component({
    selector: 'app-download-conversions-via-csv',
    templateUrl: './download-conversions-via-csv.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class DownloadConversionsViaCsvComponent implements OnInit {
    @HostBinding('class') hostClass = 'd-flex flex-column m-b-40';

    public readonly links: DownloadConversionsViaCSVLinkInterface[] = downloadConversionsViaCSVLinks;

    public linkToCSVFile: string;

    constructor(private parentForm: FormGroupDirective) {}

    ngOnInit(): void {
        this.linkToCSVFile = this.parentForm.form.getRawValue().filename || null;
    }

    selectedFile(file: File) {
        this.parentForm.form.patchValue({
            source_file: file
        });
    }
}
