import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import {
    OFFER_CUSTOM_PARAMETER_LIST_PROVIDER,
    OfferCustomParamListQuery,
    OfferCustomParamListService
} from '@scaleo/feature/manager/offer/custom-param/list/data-access';
import { OfferCustomParameterCreateComponent } from '@scaleo/feature/manager/offer/custom-param/upsert/modal-form';
import { BaseStatusNameEnum } from '@scaleo/platform/list/access-data';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-offer-custom-params',
    templateUrl: './offer-custom-params.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_CUSTOM_PARAMETER_LIST_PROVIDER, UnsubscribeService]
})
export class OfferCustomParamsComponent implements OnInit {
    form: FormGroup;

    readonly loading$ = this.query.selectLoading();

    readonly pagination$ = this.query.pagination$;

    readonly items$ = this.query.selectAll();

    readonly totalCount$ = this.query.totalCount$;

    readonly isLoad$ = this.query.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    constructor(
        private readonly service: OfferCustomParamListService,
        private readonly query: OfferCustomParamListQuery,
        private readonly fb: FormBuilder,
        private readonly modal3: Modal3Service,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            status: this.query.getParamsValue('status')
        });

        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    addCustomParams(id?: number): void {
        this.modal3
            .editForm<OfferCustomParamListModel>(OfferCustomParameterCreateComponent, {
                data: {
                    id
                }
            })
            .afterClosed$.pipe(takeUntil(this.unsubscribe))
            .subscribe(({ type, data }) => {
                const funcAfterCloseEventMap: BaseObjectModel = {
                    [Modal3CloseEventEnum.Create]: (): any => this.service.add(data),
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
}
