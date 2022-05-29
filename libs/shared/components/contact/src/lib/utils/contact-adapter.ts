import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

import { CONTACT } from '../constant/contact-icon';
import { ContactModel, MessengerEnum } from '../models/contact.model';

export class ContactAdapter {
    constructor(private selectedMessengers: string | ContactModel[], private allMessengers: PlatformListsFormatInterface[]) {}

    transform(): ContactModel[] {
        let selectedMessengers: ContactModel[] = this.selectedMessengers as ContactModel[];
        if (typeof this.selectedMessengers === 'string') {
            selectedMessengers = Util.jsonParse(this.selectedMessengers);
        }

        if (Array.isArray(selectedMessengers)) {
            return selectedMessengers
                ?.filter((elem) => this.allMessengers.some((elem2) => elem2.id === elem.type))
                ?.map((elem) => {
                    const contact = this.allMessengers.find((messenger) => messenger.id === elem.type);
                    return {
                        ...elem,
                        title: CONTACT[contact.id as MessengerEnum]?.name
                    };
                });
        }

        return [];
    }
}
