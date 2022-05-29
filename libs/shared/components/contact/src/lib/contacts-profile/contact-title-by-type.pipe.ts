import { Pipe, PipeTransform } from '@angular/core';

import { CONTACT } from '../constant/contact-icon';
import { MessengerEnum } from '../models/contact.model';

@Pipe({
    name: 'contactTitleByType'
})
export class ContactTitleByTypePipe implements PipeTransform {
    transform(type: MessengerEnum): string {
        return CONTACT[type]?.name;
    }
}
