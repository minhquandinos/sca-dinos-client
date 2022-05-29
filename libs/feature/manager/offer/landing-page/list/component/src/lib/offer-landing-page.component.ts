import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, pluck, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    OFFER_LANDING_PAGE_PROVIDER,
    OfferLandingPageQuery,
    OfferLandingPageService
} from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import { OfferLandingPageUpsertComponent } from '@scaleo/feature/manager/offer/landing-page/upsert/modal-form';
import { OfferLandingPageStatusIdEnum } from '@scaleo/platform/list/access-data';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-offer-landing-page',
    templateUrl: './offer-landing-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, OFFER_LANDING_PAGE_PROVIDER]
})
export class OfferLandingPageComponent implements OnInit {
    form: FormGroup;

    readonly loading$ = this.query.loading$;

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly items$ = this.query.selectAll();

    readonly totalCount$: Observable<number> = this.query.selectDataValue$('pagination').pipe(pluck('total_count'));

    readonly isLoad$ = this.query.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    constructor(
        private readonly offerLandingService: OfferLandingPageService,
        private readonly query: OfferLandingPageQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly fb: FormBuilder,
        private readonly modal3: Modal3Service
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            status: this.query.getParamsValue('status')
        });
        this.offerLandingService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    upsertForm(id?: number) {
        const ref = this.modal3.editForm(OfferLandingPageUpsertComponent, {
            data: {
                id
            }
        }).afterClosed$;

        ref.pipe(
            filter(({ type }) => type === Modal3CloseEventEnum.Create),
            tap(({ data }) => {
                this.offerLandingService.add(data);
            })
        )
            .toPromise()
            .then();

        ref.pipe(
            filter(({ type }) => type === Modal3CloseEventEnum.Update),
            tap(({ data }) => {
                this.offerLandingService.update(id, data);
            })
        )
            .toPromise()
            .then();

        ref.pipe(
            filter(({ type }) => type === Modal3CloseEventEnum.Delete),
            tap(() => {
                this.offerLandingService.remove(id);
            })
        )
            .toPromise()
            .then();
    }

    statusWasChanged(event: SelectChangeModel<OfferLandingPageStatusIdEnum>) {
        this.offerLandingService.updateParamsValue({ status: event.newValue });
    }

    pageWasChanged(page: number) {
        this.offerLandingService.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number) {
        this.offerLandingService.updateParamsValue({ perPage, page: 1 });
    }
}
