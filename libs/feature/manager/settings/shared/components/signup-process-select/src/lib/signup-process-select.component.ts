import { Component, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-signup-process-select',
    templateUrl: './signup-process-select.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class SignupProcessSelectComponent {
    public readonly signUpProcessWays: PlatformListsFormatInterface[] = [
        {
            id: 1,
            title: 'without_approval'
        },
        {
            id: 2,
            title: 'email_verification_required'
        },
        {
            id: 0,
            title: 'approval_required'
        }
    ];

    constructor() {}
}
