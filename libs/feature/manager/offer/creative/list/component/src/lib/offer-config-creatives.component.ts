import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_OFFER_CREATIVE_LIST_PROVIDER,
    ManagerOfferCreativeModel,
    OfferConfigCreativesQuery,
    OfferConfigCreativesService
} from '@scaleo/feature/manager/offer/creative/list/data-access';
import { OfferCreativeCreateInputDataModel } from '@scaleo/feature/manager/offer/creative/upsert/data-access';
import { ManagerCreativeUpsertComponent } from '@scaleo/feature/manager/offer/creative/upsert/modal-form';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { BaseStatusNameEnum } from '@scaleo/platform/list/access-data';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-offer-config-creatives',
    templateUrl: './offer-config-creatives.component.html',
    providers: [MANAGER_OFFER_CREATIVE_LIST_PROVIDER, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferConfigCreativesComponent implements OnInit {
    form: FormGroup;

    readonly loading$ = this.query.selectLoading();

    readonly pagination$ = this.query.pagination$;

    readonly items$ = this.query.getItems$;

    readonly totalCount$ = this.query.totalCount$;

    readonly isLoad$ = this.query.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    private readonly reloadSubject$ = new BehaviorSubject<boolean>(true);

    constructor(
        private readonly service: OfferConfigCreativesService,
        private readonly query: OfferConfigCreativesQuery,
        private readonly fb: FormBuilder,
        private readonly modal3: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        private readonly offerQuery: OfferDetailQuery
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            status: this.query.getParamsValue('status')
        });

        this.reloadSubject$
            .pipe(
                switchMap(() => this.service.index()),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    addCreative(id?: number): void {
        this.modal3
            .editForm<ManagerOfferCreativeModel, OfferCreativeCreateInputDataModel>(ManagerCreativeUpsertComponent, {
                data: {
                    id,
                    offerId: this.offerQuery.id
                }
            })
            .afterClosed$.pipe(takeUntil(this.unsubscribe))
            .subscribe(({ type, data }) => {
                const funcAfterCloseEventMap: BaseObjectModel = {
                    [Modal3CloseEventEnum.Create]: (): any => (data ? this.service.add(data) : this.reload()),
                    [Modal3CloseEventEnum.Update]: (): any => this.service.update(data),
                    [Modal3CloseEventEnum.Delete]: (): any => this.service.remove(id)
                };

                const func = funcAfterCloseEventMap[type];
                if (func) {
                    func();
                }
            });
    }

    statusWasChanged(event: SelectChangeModel<BaseStatusNameEnum>): void {
        this.service.updateParamsValue({ status: event.newValue });
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.service.updateParamsValue({ perPage, page: 1 });
    }

    private reload(): void {
        this.reloadSubject$.next(true);
    }
}
