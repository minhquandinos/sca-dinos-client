import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, first, map, pluck, share, startWith, switchMap } from 'rxjs/operators';

import { RelationMessengersModel } from '@scaleo/account/data-access';
import { PlatformListsFormatInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { animationRules } from '@scaleo/shared/animations';
import { ValidationMethods } from '@scaleo/shared/validators';

import { ContactModel } from '../models/contact.model';

// TODO refactor this component
@Component({
    selector: 'shared-add-contact',
    templateUrl: './add-contact.component.html',
    animations: [animationRules.animationTriggerForSortLists],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AddContactComponent implements OnInit {
    @Input() formName = 'contacts';

    @Input() opportunityAddContact = true;

    @Input() selectedMessengers: RelationMessengersModel[] | ContactModel[] = [];

    allMessengers: PlatformListsFormatInterface[] = [];

    messengers$: Observable<PlatformListsFormatInterface[]> = this.platformListsService.platformListsNew('messengers').pipe(
        pluck('messengers'),
        switchMap((messengers) => combineLatest([this.form.valueChanges.pipe(startWith(this.contactsValueArray || [])), of(messengers)])),
        map(([values, messengers]) =>
            messengers.map((message: any) => ({
                ...message,
                disabled: values?.some((selected: any) => message.id === selected.type)
            }))
        ),
        share()
    );

    messengersCount$: Observable<number> = this.messengers$.pipe(map((messengers) => messengers?.length));

    constructor(
        private formBuilder: FormBuilder,
        private validation: ValidationMethods,
        private parentForm: FormGroupDirective,
        private platformListsService: PlatformListsService
    ) {}

    ngOnInit(): void {
        this.initContacts();
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     const contacts = changes.selectedMessengers;
    //     if (contacts && contacts.currentValue) {
    //         this.initContacts();
    //     }
    //     // if (this.messengers?.length > 0) {
    //     //     this.allMessengers = this.messengers;
    //     //     setTimeout((): any => this.deleteMessengerFromListsAfterChouse());
    //     // }
    // }

    private initContacts(): void {
        if (this.selectedMessengers?.length > 0) {
            this.selectedMessengers.forEach((param) => {
                this.contactsGroupArray.push(
                    this.formBuilder.group({
                        type: param.type,
                        account: param.account
                    })
                );
            });
        } else {
            this.messengers$
                .pipe(
                    filter((messengers) => messengers.length > 0),
                    first()
                )
                .subscribe((messengers) => {
                    const skype = messengers.find((messenger) => messenger.id === 1);
                    const anyMessenger = messengers[0];
                    this.contactsGroupArray?.push(
                        this.formBuilder.group({
                            type: [skype?.id || anyMessenger?.id, this.form.validator],
                            account: ['', this.form.validator]
                        })
                    );
                });
        }
    }

    public addContact(): void {
        (this.parentForm.form.get(this.formName) as FormArray).push(this.addContactFormGroup());
        // this.deleteMessengerFromListsAfterChouse();
    }

    public addContactFormGroup(typeValue: number = null, accountValue: string = null): FormGroup {
        return this.formBuilder.group({
            type: [typeValue],
            account: [accountValue]
        });
    }

    public clearContactField(index: number): void {
        const contact = (this.parentForm.form.get(this.formName) as FormArray).controls[index];
        contact.reset({
            type: '',
            account: [null]
        });
        this.deleteMessengerFromListsAfterChouse();
    }

    public deleteMessengerFromListsAfterChouse(): void {
        // const chousesContact = [];
        // (this.parentForm.form.get(this.formName) as FormArray).controls.map((contact) => {
        //     chousesContact.push(contact['controls'].type.value);
        // });
        // if (this.messengers) {
        //     const messengers = this.allMessengers.map((obj) => {
        //         const selected = chousesContact.findIndex((id) => obj.id === id);
        //         obj.disabled = selected >= 0;
        //         return obj;
        //     });
        //     this.messengers = [...messengers.filter((obj) => !obj.disabled)];
        // }
    }

    public removeEmptyContacts(): string {
        const contacts = this.contactsValueArray;

        if (!contacts) {
            return '';
        }

        const removeEmptyContacts = contacts
            .filter((contact) => !!contact.type && !!contact.account && !!contact.account[0])
            .map((contact) => {
                const messenger = this.allMessengers.find((c) => c.id === contact.type);
                return {
                    ...contact,
                    title: messenger ? messenger.title : ''
                };
            });
        return JSON.stringify(removeEmptyContacts);
    }

    get form(): FormGroup {
        return this.parentForm.form.get(this.formName) as FormGroup;
    }

    get contactsValueArray(): RelationMessengersModel[] {
        return this.contactsGroupArray.value;
    }

    get contactsGroupArray(): FormArray {
        return this.parentForm.form.get('contacts') as FormArray;
    }
}
