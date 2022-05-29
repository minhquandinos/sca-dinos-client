import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferConfigGoalsUtil } from '@scaleo/feature/manager/offer/goal/common';
import { OFFER_GOAL_LIST_PROVIDER, OfferGoalListQuery, OfferGoalListService } from '@scaleo/feature/manager/offer/goal/list/data-access';
import { OfferGoalCreateComponent } from '@scaleo/feature/manager/offer/goal/upsert/modal-form';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-offer-config-goals',
    templateUrl: './offer-goals-collection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_GOAL_LIST_PROVIDER, UnsubscribeService]
})
export class OfferGoalsCollectionComponent implements OnInit {
    readonly items$ = this.query.selectAll();

    readonly loading$ = this.query.loading$;

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly totalCount$: Observable<number> = this.query.selectDataValue$('pagination').pipe(pluck('total_count'));

    readonly isLoad$ = this.query.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: OfferGoalListService,
        private query: OfferGoalListQuery,
        private unsubscribe: UnsubscribeService,
        private readonly modal3: Modal3Service,
        private offerDetailQuery: OfferDetailQuery
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            status: this.query.getParamsValue('status')
        });
        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    searching(event: string): void {
        this.service.setSearch(event);
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.service.updateParamsValue({ perPage });
    }

    statusWasChanged({ newValue }: SelectChangeModel): void {
        this.service.updateParamsValue({ status: newValue });
    }

    upsertForm(id?: number) {
        const modalRef = this.modal3.editForm(OfferGoalCreateComponent, {
            data: {
                editId: id,
                offerId: this.offerDetailQuery.id,
                showDefaultButton: OfferConfigGoalsUtil.showDefaultButton(this.query.getAll() as any)
            }
        }).afterClosed$;

        modalRef
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Delete),
                takeUntil(this.unsubscribe)
            )
            .subscribe(({ data }) => {
                this.service.remove(data);
                this.service.reload();
            });

        modalRef
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Create),
                takeUntil(this.unsubscribe)
            )
            .subscribe(({ data }) => {
                this.service.create(data);
            });

        modalRef
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                takeUntil(this.unsubscribe)
            )
            .subscribe(({ data }) => {
                this.service.update(id, data);
            });
    }
}
