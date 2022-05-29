import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';

import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

import { CONTACT_ICON } from '../constant/contact-icon';
import { ContactModel } from '../models/contact.model';

@Component({
    selector: 'shared-contact-icon',
    templateUrl: './contact-icon.component.html',
    styleUrls: ['./contact-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactIconComponent implements OnInit {
    @Input() show: number | 'all' = 'all';

    @Input() icon: string | ContactModel;

    @Input() value: string;

    @Input() maxWidth: number;

    public iconClass: string;

    public account: string;

    public accountName: string;

    constructor(private renderer2: Renderer2, private cdr: ChangeDetectorRef, private shared: SharedMethodsService) {}

    ngOnInit(): void {
        if (typeof this.icon === 'string') {
            const icon = CONTACT_ICON.find((i) => i.name.toLowerCase() === this.icon.toString().toLowerCase());

            if (icon) {
                this.iconClass = icon.icon;
                this.account = this.value;
                this.accountName = icon.name;
            }
        }

        if (typeof this.icon === 'object') {
            if (this.icon.type) {
                const icon = CONTACT_ICON.find((i) => i.id === (this.icon as ContactModel).type);

                if (icon) {
                    this.iconClass = icon.icon;
                    this.account = this.icon.account;
                    this.accountName = icon.name;
                }
            }
        }
    }

    public copyAccount() {
        this.shared.copyToMemory(this.account, 'interface.basic.link_copy');
    }
}
