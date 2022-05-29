import { Component, OnInit } from '@angular/core';
import { filter, Observable, Subject, switchMap, take } from 'rxjs';
import { share, startWith, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { BasicListsAdministrationInterface } from '../lists.administration.interface';
import { ListsAdministrationService } from '../lists.administration.service';
import { TrafficTypeCreateComponent } from './traffic-type-create/traffic-type-create.component';

@Component({
    selector: 'scaleo-mng-list-traffic-types',
    templateUrl: './list-traffic-types.component.html',
    providers: [UnsubscribeService]
})
export class ListTrafficTypesComponent implements OnInit {
    public editId: number;

    public trafficTypes$: Observable<BasicListsAdministrationInterface[]>;

    public trafficTypesSubject$: Subject<void> = new Subject<void>();

    constructor(
        private listsAdministrationService: ListsAdministrationService,
        private modal3Service: Modal3Service,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.trafficTypes$ = this.trafficTypesSubject$.pipe(
            startWith(null),
            switchMap(() => this.listsAdministrationService.indexTrafficTypes()),
            share()
        );

        // this.parentComponent.listTrafficTypes.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        //     this.trafficTypesSubject$.next();
        // });
    }

    public openModal(editId?: number) {
        const modal$ = this.modal3Service.editForm(TrafficTypeCreateComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Delete, Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.trafficTypesSubject$.next();
            });
    }

    public changeSort(trafficTypes: BasicListsAdministrationInterface[]) {
        trafficTypes.forEach((el, key) => {
            const post = {
                ...el,
                // eslint-disable-next-line no-plusplus
                sort: ++key
            };

            this.listsAdministrationService.updateTrafficType(post.id, post).pipe(takeUntil(this.unsubscribe)).subscribe();
        });
    }
}
