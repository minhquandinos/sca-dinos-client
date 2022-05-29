import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { animationRules } from '@scaleo/shared/animations';

import { BasicListsAdministrationInterface } from '../../../lists.administration.interface';

enum IconsEnum {
    'Skype' = 1,
    'WatsApp' = 2,
    'Messenger' = 3,
    'Viber' = 4,
    'Telegram' = 5,
    'Line' = 6,
    'WeChat' = 7
}

@Component({
    selector: 'scaleo-mng-add-lists',
    templateUrl: './add-lists.component.html',
    styleUrls: ['./add-lists.component.css'],
    animations: [animationRules.animationTriggerForSortLists]
})
export class AddListsComponent implements OnInit, OnChanges {
    @Input() lists: BasicListsAdministrationInterface[];

    @Input() showIcon: boolean;

    @Output() toggle: EventEmitter<number> = new EventEmitter<number>();

    @Output() toggleChangeSort: EventEmitter<BasicListsAdministrationInterface[]> = new EventEmitter<BasicListsAdministrationInterface[]>();

    public newLists: BasicListsAdministrationInterface[];

    tableHeader: string[] = [''];

    public options: any = {
        handle: '.config-list__sort',
        onUpdate: (): any => this.postChangesToServer()
    };

    ngOnInit(): void {
        this.newLists = this.lists;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { lists } = changes;

        if (lists && lists.currentValue) {
            this.convertList();
        }
    }

    public openModal(id: number) {
        this.toggle.emit(id);
    }

    public postChangesToServer() {
        this.toggleChangeSort.emit(this.lists);
    }

    public iconName(icon: BasicListsAdministrationInterface): string {
        if (icon.id === IconsEnum.Messenger) {
            return 'Messenger'.toLocaleLowerCase();
        }
        return icon.title.toLocaleLowerCase();
    }

    private convertList() {
        if (this.showIcon) {
            this.newLists = this.lists.map((el) => ({
                ...el,
                iconName: this.iconName(el)
            }));
        } else {
            this.newLists = this.lists;
        }
    }
}
