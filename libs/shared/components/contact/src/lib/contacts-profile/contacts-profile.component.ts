import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContactModel } from '../models/contact.model';

@Component({
    selector: 'shared-contacts-profile',
    templateUrl: './contacts-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsProfileComponent {
    @Input() contacts: ContactModel[];
}
