import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subject, Subscription, take } from 'rxjs';
import { share, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { BasicListsAdministrationInterface } from '../lists.administration.interface';
import { ListsAdministrationService } from '../lists.administration.service';
import { TagCreateComponent } from './tag-create/tag-create.component';

@Component({
    selector: 'scaleo-mng-list-tags',
    templateUrl: './list-tags.component.html',
    providers: [UnsubscribeService]
})
export class ListTagsComponent implements OnInit, OnDestroy {
    public editId: number;

    public tags$: Observable<BasicListsAdministrationInterface[]>;

    private tagsSubject$: Subject<void> = new Subject<void>();

    private getTagsSub: Subscription;

    private updateSub: Subscription;

    constructor(
        private listsAdministrationService: ListsAdministrationService,
        private modal3Service: Modal3Service,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.tags$ = this.tagsSubject$.pipe(
            startWith(''),
            switchMap(() => this.listsAdministrationService.indexTags()),
            share()
        );
    }

    ngOnDestroy(): void {
        if (this.getTagsSub) {
            this.getTagsSub.unsubscribe();
        }
        if (this.updateSub) {
            this.updateSub.unsubscribe();
        }
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public openModal(editId?: number) {
        const modal$ = this.modal3Service.editForm(TagCreateComponent, {
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
                this.tagsSubject$.next();
            });
    }

    public changeSort(tags: BasicListsAdministrationInterface[]) {
        tags.forEach((el, key) => {
            const post = {
                ...el,
                // eslint-disable-next-line no-plusplus
                sort: ++key
            };

            this.updateSub = this.listsAdministrationService.updateTag(post.id, post).pipe(takeUntil(this.unsubscribe)).subscribe();
        });
    }
}
