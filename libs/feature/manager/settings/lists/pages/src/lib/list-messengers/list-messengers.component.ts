import { Component, OnInit } from '@angular/core';
import { filter, Observable, Subject, switchMap, take } from 'rxjs';
import { share, startWith, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { BasicListsAdministrationInterface } from '../lists.administration.interface';
import { ListsAdministrationService } from '../lists.administration.service';
import { MessengerCreateComponent } from './messenger-create/messenger-create.component';

@Component({
    selector: 'scaleo-mng-list-messengers',
    templateUrl: './list-messengers.component.html',
    providers: [UnsubscribeService]
})
export class ListMessengersComponent implements OnInit {
    public editId: number;

    public messengers$: Observable<BasicListsAdministrationInterface[]>;

    private messengersSubject$: Subject<void> = new Subject<void>();

    constructor(
        private listsAdministrationService: ListsAdministrationService,
        private modal3Service: Modal3Service,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.messengers$ = this.messengersSubject$.pipe(
            startWith(null),
            switchMap(() => this.listsAdministrationService.indexMessengers()),
            share()
        );
    }

    public openModal(editId?: number) {
        const modal$ = this.modal3Service.editForm(MessengerCreateComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create].includes(type as Modal3CloseEventEnum)),
                take(1)
            )
            .subscribe(() => {
                this.messengersSubject$.next();
            });
    }

    public changeSort(messengers: BasicListsAdministrationInterface[]) {
        messengers.forEach((el, key) => {
            const post = {
                ...el,
                sort: ++key
            };

            this.listsAdministrationService.updateMessenger(post.id, post).pipe(takeUntil(this.unsubscribe)).subscribe();
        });
    }
}
