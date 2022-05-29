import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContactModel } from '../models/contact.model';

@Component({
    selector: 'shared-contact-list-icon',
    templateUrl: './contact-list-icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListIconComponent {
    @Input() show: number | 'all' = 'all';

    @Input() set contacts(value: ContactModel[]) {
        if (value) {
            this._contacts$.next(value);
        }
    }

    @Input() phone: string;

    allContactsAsString = '';

    private _contacts$: BehaviorSubject<ContactModel[]> = new BehaviorSubject<ContactModel[]>([]);

    // contacts$ = this.contactsStream$();

    readonly contacts$ = this._contacts$;

    allContactsAsString$: Observable<string> = this._contacts$.pipe(
        map((messengers) => messengers.map((elem) => `${elem.title}: ${elem.account}`).join('<br>'))
    );
}
