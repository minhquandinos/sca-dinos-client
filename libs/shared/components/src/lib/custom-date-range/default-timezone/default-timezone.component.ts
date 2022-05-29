import { Component } from '@angular/core';

import { DefaultTimezoneService } from './default-timezone.service';
import { NewTimezoneService } from './new-timezone.service';

@Component({
    selector: 'app-default-timezone',
    templateUrl: './default-timezone.component.html'
})
export class DefaultTimezoneComponent {
    timezone: string = this.setTimezone();

    timezones$ = this.timezoneService.timezones$;

    constructor(private readonly timezoneService: DefaultTimezoneService, private readonly newTimezoneService: NewTimezoneService) {}

    changeTimeZone(event: any): void {
        this.timezone = event.newValue;
        this.newTimezoneService.timezone.next(event.newValue);
    }

    setTimezone(): string {
        const newTimezone = this.newTimezoneService.timezone.value;
        const defaultTimezone = this.timezoneService.timezone;
        return newTimezone || defaultTimezone;
    }
}
