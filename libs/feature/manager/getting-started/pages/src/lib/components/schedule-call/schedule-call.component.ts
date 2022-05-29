import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';

@Component({
    selector: 'manager-getting-started-schedule-call',
    templateUrl: './schedule-call.component.html'
})
export class ScheduleCallComponent implements OnInit {
    image = 'https://s3.eu-central-1.amazonaws.com/storage.scaleo.io/users/image.png';

    firstname: string;

    showCalendly: boolean;

    @ViewChild('iframe') iframeTemplate: TemplateRef<HTMLElement>;

    constructor(private profileQuery: ProfileQuery) {}

    ngOnInit(): void {
        this.firstname = this.profileQuery.profile.firstname;
    }

    scheduleCall() {
        this.showCalendly = !this.showCalendly;
        // window.open('https://www.scaleo.io/en/contacts', '_blank');
    }

    close(event: boolean) {
        if (event) {
            this.showCalendly = !this.showCalendly;
        }
    }
}
